 import mysql from 'mysql2/promise';

 const pool = mysql.createPool({
    host:"127.0.0.1",
    port: 3306,
    password:"12345678910",
    user: "root",
    database : "tasks"
 }) 

 
export default pool;

try {
  const connection = await pool.getConnection();
  console.log("✅ Database connected successfully!");
  connection.release();
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
}

export class db_model{
    static async getTasks (){
        const [rows] = await pool.query("SELECT * FROM tareas");
        return rows;
    }

    
    static async getByTitle (title){
         const [tasks] = await pool.query(
      'SELECT * FROM tareas WHERE task_title = ?',
      [title]
    );

        if(tasks.length === 0) return null

        return tasks[0]
    }

    static async create({ input }) {
    const {
    task_description,
    task_title,
    task_situation
     } = input

    const result = await pool.query(

     `INSERT INTO tareas (task_description,task_title,task_situation)
      VALUES (?,?,?);`,

   [task_description,task_title,task_situation]
    )
      if(result === null){
        console.log("hubo un error")
      }
    console.log(result)
  }
}

        