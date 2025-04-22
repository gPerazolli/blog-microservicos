const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Registro
async function register(req, res) {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });
    res.status(201).json({ message: 'Usuário registrado com sucesso', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Senha inválida' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no login' });
  }
}

// Verificar token
function verifyToken(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = { register, login, verifyToken };
