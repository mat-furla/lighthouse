import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import queue from './lib/queue'

import { PORT } from './environment'

const main = async () => {
  // Create express instance
  const app = express()
  app.use(json())
  app.use(cors())
  app.use(helmet())

  // Routes
  app.get('/', (req, res) => {
    res.status(200).json('Server is running')
  })
  app.post('/audit', async (req, res) => {
    try {
      await queue.add('audit', req.body)
    } catch (error) {
      res.status(404).json('Job failed')
    }
    res.status(200).json('Job is running')
  })

  // Listen port
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
main()
