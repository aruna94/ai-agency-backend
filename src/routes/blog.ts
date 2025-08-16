import { Router } from 'express'
import BlogPost from '../models/BlogPost.js'

const router = Router()

router.get('/', async (_req, res) => {
  const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).limit(9)
  res.json(posts.map(p => ({ _id: p._id, title: p.title, excerpt: p.excerpt })))
})

// seed a sample post if DB empty (dev helper)
router.post('/seed', async (_req, res) => {
  const count = await BlogPost.countDocuments()
  if (count > 0) return res.json({ ok: true, seeded: false })
  await BlogPost.create({
    title: 'How to Pick Your First AI Use‑Case',
    excerpt: 'A simple framework to prioritize high‑ROI AI projects.',
    content: '...'
  })
  res.json({ ok: true, seeded: true })
})

export default router
