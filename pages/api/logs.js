import fs from 'fs'
import path from 'path'
import date from 'date-and-time'

export default function handler(req, res) {
    const logpath = "/oli/log"

    const now = new Date()
    const dateFmt = date.format(now, 'YYYY-MM-DD')
    const fullPath = path.join(logpath, `MMDVM-${dateFmt}.log`)

    if (!fs.existsSync(fullPath)) {
        res.status(200).json({logs: [], status: `cannot open ${fullPath}`})
        return
    }

    const data = fs.readFileSync(fullPath).toString()

    if (!data) {
        console.log(`Log file not found ${fullPath}`)
        res.status(200).json({logs: [], status: `Log file ${fullPath} not found`})
    }

    const logs = []
    for (var line of data.split("\n")) {
        logs.push(line)
    }

    res.status(200).json({logs: logs, status: "OK"})
}