const express = require('express');
const { sequelize } = require('./models/user');
const authRoutes = require('./routes/authRoute');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch((err) => console.error('Erro ao sincronizar o banco', err));

module.exports = app;
