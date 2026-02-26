import 'dotenv/config';
import mysql from 'mysql2/promise';

 export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


try {
  const connection = await pool.getConnection();
  console.log("✅ Database connected successfully!");
  connection.release();
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
}


async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
   // console.log("✅ Database connected successfully!");
   // console.log("Test result:", rows[0].result);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

testConnection();
