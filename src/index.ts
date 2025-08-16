import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.js'
import chatRoutes from './routes/chat.js'
import blogRoutes from './routes/blog.js'

const app = express()

app.use(helmet())
app.use(express.json({ limit: '1mb' }))
// app.use(morgan('tiny'))

const origin = process.env.CORS_ORIGIN || '*'
app.use(cors({ origin }))

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 })
app.use(limiter)

app.get('/health', (_, res) => res.json({ ok: true }))

app.use('/contact', contactRoutes)
app.use('/chat', chatRoutes)
app.use('/blog', blogRoutes)

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || ''

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected')
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
}).catch(err => {
  console.error('MongoDB error:', err.message)
  process.exit(1)
})
