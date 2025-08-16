import { Router } from 'express'

const router = Router()

// Simple demo chatbot without external APIs.
router.post('/', async (req, res) => {
  const msg = (req.body?.message || '').toLowerCase()
  let reply = 'Thanks! A solutions consultant will reach out shortly.'

  if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing'))
    reply = 'Projects typically start at $10k. Book a consultation to get a tailored quote.'
  else if (msg.includes('services') || msg.includes('what can you do'))
    reply = 'We build AI Systems, Full‑Stack Apps, Chatbots, Voice Assistants, Automations, and offer AI Consulting.'
  else if (msg.includes('book') || msg.includes('consult'))
    reply = 'Great! Please leave your email on the contact page and we’ll schedule a call.'

  return res.json({ reply })
})

export default router
