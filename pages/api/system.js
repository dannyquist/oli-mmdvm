import fs from 'fs'
import psList from 'ps-list'
import process from 'process'
var Docker = require('dockerode')

const SIGUSR1 = 30

export default async function(req, res) {
    console.log("system api call received")

    let command = null

    if (req.query && req.query.command) {
        command = req.query.command
    }

    if (!command) {
        res.status(200).json({status: "no command"})
        return
    }

    // Find the mmdvmhost docker container

    const docker = new Docker()

    switch(command) {
        case "reload":
            const containers = await docker.listContainers()

            var ret = {status: "container not running"}
        
            for (const container of containers) {
                if (container.Command.includes("MMDVMHost")) {
                    const mmdvm_container = docker.getContainer(container.Id)
                    if (mmdvm_container.restart())
                        ret = {status: "success"}
                    else
                        ret = {status: `error could not restart container ${container.Id}`}
                }    
            }
        
            break
        default:
            console.log(`Received unknown command ${command}`)
    }

    res.status(200).json(ret)
}

