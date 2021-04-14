import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
    const { theme } = req.query

    const lowerCase = theme.toLowerCase()
    const dataPath = path.join(process.cwd(), '/public/themes/' + lowerCase + '.json')
    let exist = fs.stat(dataPath)

    if (exist)
        res.end(await fs.readFile(dataPath, 'utf8'))
    else
        res.end({
            error: "This theme is not existing."
        })
}