import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 8000
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000'

app.use(
  cors({
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)
app.use(bodyParser.json({ limit: '10mb' })) // Увеличиваем лимит размера тела запроса до 10 МБ
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json())
app.use(logger)
app.use('/api', globalRouter)

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
