import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { PORT } from './environment'

const main = async () => {
  // Create express instance
  const app = express()
  app.use(json())

  // Enable middlewares
  app.use(cors())
  app.use(helmet())

  // Routes
  app.get('/', (req, res) => {
    res.status(200).json('Server is running')
  })
  app.post('/audit', (req, res) => {
    res.status(200).json('Server is running')
  })

  // Listen ports
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
main()
