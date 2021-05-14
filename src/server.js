import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes'
import { PORT } from './environment'

// Cria instância do Express
const app = express()
app.use(json())
app.use(cors())
app.use(helmet())

// Rotas
app.use('/', routes)

// Execução
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
