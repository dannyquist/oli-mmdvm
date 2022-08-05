import ini from 'ini'
import fs from 'fs'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const CONF_DIR = "/oli/conf/"
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
      res.status(200).json({status: 'OK'})
      return
    }

    if (req.query && req.query.mode) {
      mode = req.query.mode
    }

    if (!fs.existsSync(MMDVM_INI)) {
      res.status(200).json({config: {}, status: "not configured"})
      return
    }

    var config
    var data = fs.readFileSync(MMDVM_INI, 'utf-8')

    if (!data) {
      res.status(200).json({config: {}, status: "not found"})
      return
    }

    switch (mode) {
      case "ini":
        config = data
        break
      case "json":
      default:
        config = ini.parse(data)
        break
    }

    res.status(200).json({ config: config, status: "OK" })
  }
  