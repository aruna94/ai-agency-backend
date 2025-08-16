import mongoose from 'mongoose'

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  published: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('BlogPost', BlogPostSchema)


