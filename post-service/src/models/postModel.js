// src/models/postModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorId: {
    type: DataTypes.UUID, 
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Post;

