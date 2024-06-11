import mysql from 'mysql2/promise';
require('dotenv').config();

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: 'CZ4hJACbTA$BtE8',
      database: process.env.DB_NAME,
    });
    return connection;
  } catch (error: any) {
    console.error('Database connection failed:', error);
    throw error;
  }
}
