import pool from "./db_task.js";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected successfully!");
    console.log("Test result:", rows[0].result);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

testConnection();