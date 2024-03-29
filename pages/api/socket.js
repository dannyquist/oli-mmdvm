import { Server } from 'socket.io'
import Tail from 'tail-file'
import path from 'path'
import fs from 'fs'
import date from 'date-and-time'
import {waitFile} from 'wait-file'

const logpath = "/oli/log"


const SocketHandler = (req, res) => {
    const fullPath = path.join(logpath, `MMDVM.log`)

    if (res.socket.server.io) {
        console.log("Socket is already running")
        res.end()
    } else {
        console.log("Socket is initializing")
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            console.log("connection received")
            socket.broadcast.emit('dmr-status', {type: 'state', component: 'sock', status: 'Hello.'})
        
            const mytail = new Tail(fullPath, line => {
                const logre = /(\w): ([0-9]{4}-[0-9]{2}-[0-9]{2}) ([0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{3}) (.*)/
                const logMatch = logre.exec(line)
                
                if (!logMatch) {
                    console.log("error, did not recognize:", line)
                    return
                }

                const [_line, _type, _date, _time, _msg] = logMatch

                switch (_type) {
                    case 'I':
                        if (_msg.includes("Opening the MMDVM")) {
                            socket.broadcast.emit('status', {type: _type, date: _date, time: _time, msg: "startup"})
                        } else if (_msg.includes("MMDVMHost") && _msg.includes("is running")) {
                            socket.broadcast.emit('status', {type: _type, date: _date, time: _time, msg: "online"})
                        }
                    case 'W':
                    case 'E':
                        socket.broadcast.emit('log', {type: _type, date: _date, time: _time, msg: _msg})
                        break
                    case 'M':
                        if (_msg === "MMDVMHost-20210921 is running") {
                            socket.broadcast.emit('dmr-status', {type: 'state', component: 'MMDVMHost', status: 'running'})
                        } else if (_msg.includes("Downlink Activate received from")) {
                            const _from = _msg.split(" ").slice(-1)[0]
                            socket.broadcast.emit('dmr-status', {type: "start", from: _from, datetime: `${_date} ${_time}`})
                        } else if (_msg.includes("received network voice header from ")) {
                            const re = /received network voice header from (.*) to (.*)/
                            const reMatch = re.exec(_msg)

                            if (!reMatch) {
                                console.log("Error parsing", _msg)
                                return
                            }

                            const [_m, _from, _to] = reMatch

                            socket.broadcast.emit('dmr-status', {type: 'transmit', from: _from, to: _to, datetime: `${_date} ${_time}`})

                        } else if (_msg.includes("received network end of voice transmission from ")) {
                            const re = /DMR Slot ([0-9]), received network end of voice transmission from (.*) to (.*), ([0-9]+[.][0-9]+) seconds, ([0-9]+)[%] packet loss, BER: ([0-9]+[.][0-9]+)/
        
                            const reMatch = re.exec(_msg)
                            
                            if (!reMatch) {
                                console.log("ERROR parsing", _msg)
                                return
                            }

                            const [_m, _slot, _from, _to, _duration, _packet_loss, _ber] = reMatch
                            
                            socket.broadcast.emit('dmr-status', {
                                type: 'network-end',
                                slot: _slot,
                                from: _from,
                                to: _to,
                                duration: _duration,
                                packet_loss: _packet_loss,
                                ber: _ber,
                                datetime: `${_date} ${_time}`
                            })
                            
                        } else if (_msg.includes(" received RF voice header from ")) {
                            const re = /DMR Slot ([0-9]), received RF voice header from (.*) to (.*)/
                            const reMatch = re.exec(_msg)

                            if (!reMatch) {
                                console.log("ERROR parsing", _msg)
                                return
                            }

                            const [_m, _slot, _from, _to ] = reMatch

                            socket.broadcast.emit('dmr-status', {
                                type: 'network-start', 
                                slot: _slot,
                                from: _from,
                                to: _to, 
                                datetime: `${_date} ${_time}`
                            })

                        } else if (_msg.includes(" received RF end of voice transmission from ")) {
                            const re = /DMR Slot ([0-9]), received RF end of voice transmission from (.*) to (.*), ([0-9]+[.][0-9]+) seconds, BER: ([0-9]+[.][0-9]+)/
                            const reMatch = re.exec(_msg)

                            if (!reMatch) {
                                console.log("ERROR parsing", _msg)
                                return
                            }

                            const [_m, _slot, _from, _to, _duration, _packet_loss, _ber] = reMatch
                            
                            socket.broadcast.emit('dmr-status', {
                                type: 'rf-end',
                                slot: _slot,
                                from: _from,
                                to: _to,
                                duration: _duration,
                                packet_loss: _packet_loss,
                                ber: _ber, 
                                datetime: `${_date} ${_time}`
                            })

                        } else {
                            socket.broadcast.emit('log', {type: _type, date: _date, time: _time, msg: _msg})
                        }
                        break
                    default:
                        console.log("Unrecognized messsage type", _type, _msg)
                }
            })

            mytail.on('error', err => {
                console.log("boink error", err)
                socket.broadcast.emit('mmdvm', {type: 'error', msg: err})
            })

            mytail.on('ready', fd => console.log('mytail ready'))

            mytail.on('restart', reason => {
                socket.broadcast.emit('mmdvm', {type: 'restart', msg: reason})
            })

            mytail.start()

        })
    }
    res.end()
}

export default SocketHandler