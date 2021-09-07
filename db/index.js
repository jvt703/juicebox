// inside db/index.js
const { Client } = require('pg'); // imports the pg module
require('dotenv').config();
// supply the db name and location of the database

const client = new Client(process.env.Connection);

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `);

  return rows;
}


async function createUser({ username, password }) {
  try {
    const {rows} = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);
    
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
}

