import fs from 'fs'
import handlebars from 'handlebars'

const MMDVMINI_TEMPLATE = "/oli/MMDVM.ini.handlebars"
const MMDVMINI_PATH = "/oli/conf/MMDVM.ini"

export default function handler(req, res) {
    if (req.method === "POST") {
        const data = JSON.parse(req.body)

        try {
            if (!fs.existsSync(MMDVMINI_TEMPLATE)) {
                res.status(500).json({status: `${MMDVMINI_TEMPLATE} does not exist`})
                return
            }

            const source = fs.readFileSync(MMDVMINI_TEMPLATE, "utf-8")

            // console.log("Read", source)

            const template = handlebars.compile(source)
            const ini = template(data)

            console.log("Compiled", ini)

            fs.writeFileSync(MMDVMINI_PATH, ini, {flags: 'w'})

            res.status(200).json({status: "compiled"})
        } catch (err) {
            res.status(500).json({status: err, error: err})
        }
    } else {
        res.status(400).json({status: "non-POST methods not supported"})
    }
}

