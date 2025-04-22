const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const createUser = async (name, email, role) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
    [name, email, role]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const updateUser = async (id, name, email, role) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
    [name, email, role, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
