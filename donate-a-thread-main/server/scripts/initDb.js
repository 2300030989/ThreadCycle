const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function initDb() {
  console.log('Connecting to DB with user:', process.env.DB_USER);
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' checked/created.`);
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDb();
