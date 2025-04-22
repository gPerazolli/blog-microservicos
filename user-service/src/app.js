require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

module.exports = app;
