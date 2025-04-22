const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/postModel');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/posts');

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// PROTEGIDAS:
app.post('/posts', authMiddleware, async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
});

app.put('/posts/:id', authMiddleware, async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: 'Post não encontrado' });
  res.json(post);
});

app.delete('/posts/:id', authMiddleware, async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post não encontrado' });
  res.json({ message: 'Post deletado' });
});

module.exports = app;
