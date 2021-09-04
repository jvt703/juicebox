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





module.exports = {
  client, getAllUsers,
}

