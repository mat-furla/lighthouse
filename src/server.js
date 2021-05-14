import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import queue from './lib/queue'

import { PORT } from './environment'

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
  const job = await queue.add('audit', req.body)
  res.status(202).json({ id: job.id })
})

app.get('/audit/:id', async (req, res) => {
  const { id } = req.params
  const job = await queue.status('audit', id)

  if (job === null) {
    res.status(404).end()
  } else {
    const state = await job.getState()
    const reason = job.failedReason
    const report = job.returnvalue
    res.status(200).json({ id, state, reason, report })
  }
})

// Listen port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
