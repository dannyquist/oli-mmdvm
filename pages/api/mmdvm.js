import ini from 'ini'
import fs from 'fs'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const CONF_DIR = "/home/pi/code/oli/conf/"
const MMDVM_INI = CONF_DIR + "MMDVM.ini"

export default function handler(req, res) {
    var mode = "json"

    if (req.method === "POST") {
      const data = JSON.parse(req.body)
      try {
        fs.writeFileSync(MMDVM_INI, data, {flag: 'w'})
      } catch (err) {
        console.error("ERROR writing file:", err)
      }
      res.status(200).json({status: 'in dev'})
      return
    }

    if (req.query && req.query.mode) {
      mode = req.query.mode
    }

    var config
    var data = fs.readFileSync(MMDVM_INI, 'utf-8')

    switch (mode) {
      case "ini":
        config = data
        break
      case "json":
      default:
        config = ini.parse(fs.readFileSync(MMDVM_INI, 'utf-8'))
        break
    }

    res.status(200).json({ config: config })
  }
  