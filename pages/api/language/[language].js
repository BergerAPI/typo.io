import { promises as fs } from 'fs'
import path from 'path'
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

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