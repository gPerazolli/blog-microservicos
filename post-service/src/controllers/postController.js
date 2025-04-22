const Post = require('../models/Post');
const { checkUserExists } = require('../services/userService');

// Criar Post
async function createPost(req, res) {
  const { title, content, authorId } = req.body;

  try {
    const user = await checkUserExists(authorId);
    if (!user) {
      return res.status(400).json({ error: 'Autor não encontrado.' });
    }

    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro ao criar post.' });
  }
}

// Listar todos os posts
async function getPosts(req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts.' });
  }
}

// Buscar um post específico
async function getPostById(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar post.' });
  }
}

// Editar um post
async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar post.' });
  }
}

// Deletar um post
async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }
    res.json({ message: 'Post deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar post.' });
  }
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
