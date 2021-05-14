import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes'
import { PORT } from './environment'

// Create express instance
const app = express()
app.use(json())
app.use(cors())
app.use(helmet())

// Routes
app.use('/', routes)

// Listen port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
