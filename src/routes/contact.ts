import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import ContactMessage from '../models/ContactMessage.js'

const router = Router()

router.post('/',
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('message').isString().isLength({ min: 10 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    try {
      const doc = await ContactMessage.create(req.body)
      return res.status(201).json({ ok: true, id: doc._id })
    } catch (e:any) {
      return res.status(500).json({ ok: false, error: e.message })
    }
  }
)

export default router
