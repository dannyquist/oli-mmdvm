import fs from 'fs'
import path from 'path'
import date from 'date-and-time'

export default function handler(req, res) {
    const logpath = "/home/pi/code/oli/log"

    const now = new Date()
    const dateFmt = date.format(now, 'YYYY-MM-DD')
    const fullPath = path.join(logpath, `MMDVM-${dateFmt}.log`)

    const data = fs.readFileSync(fullPath).toString()
    const logs = []
    for (var line of data.split("\n")) {
        logs.push(line)
    }

    res.status(200).json({logs: logs})
}