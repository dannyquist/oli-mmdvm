import { Server } from 'socket.io'
import Tail from 'tail-file'
import path from 'path'
import date from 'date-and-time'

const logpath = "/home/pi/code/oli/log"


const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket is already running")
        res.end()
    } else {
        console.log("Socket is initializing")
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        const now = new Date()
        const dateFmt = date.format(now, 'YYYY-MM-DD')
        const fullPath = path.join(logpath, `MMDVM-${dateFmt}.log`)

        io.on('connection', socket => {
            console.log("connection received")
            socket.broadcast.emit('dmr-status', 'HELO')

            const mytail = new Tail(fullPath, line => {
                socket.broadcast.emit('log', line)
            })

            mytail.start()
        })
    }
    res.end()
}

export default SocketHandler