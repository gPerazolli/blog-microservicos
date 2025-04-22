const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3000';

async function checkUserExists(userId) {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao verificar usuário:', error.response?.data || error.message);
    return null; 
  }
}

module.exports = { checkUserExists };
