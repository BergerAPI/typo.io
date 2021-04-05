import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
    const { language } = req.query

    const dataPath = path.join(process.cwd(), '/public/data/languages/' + language + '.json')
    let exist = fs.stat(dataPath)

    if (exist)
        res.end(await fs.readFile(dataPath, 'utf8'))
    else
        res.end({
            error: "This language is not existing."
        })
}