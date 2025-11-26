 import mysql from 'mysql2/promise';

 const pool = mysql.createPool({
  host: "ballast.proxy.rlwy.net",
  port: 16041,
  user: "root",
  password: "fzepeoRugzrOYOhYCJgPjXLOYkdCPMJE",
  database: "railway"
});
  
 
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
        console.log("there is a mistake")
      }
    console.log(result)
  }

  static async delete(title){
   const [tasks] = await pool.query(`SELECT * FROM tareas WHERE task_title = ?` , [title]);

   if(tasks.length === 0 ){
       return null
  } else {
      console.log("Task found")
  }

   const erased = await pool.query( `DELETE FROM tareas WHERE task_title = ?` , [title]);

  if(erased === null){
    console.log("task not found")
  } else {
    return console.log("you deleted the task" , tasks )
  }
  
  }

  static async update(title , task_description , task_title , task_situation){
   const [tasks] = await pool.query(`SELECT * FROM tareas WHERE task_title = ?` , [title])
  
  if(tasks.length === 0 ){
       return null
  } else {
      console.log("Task found")
  }  

  const update = await pool.query('UPDATE tareas SET task_description = ? , task_title = ?, task_situation = ? WHERE task_title = ?',
   [task_description , task_title , task_situation , title])
   
  if(update === null){
    console.log("task not found")
  } else {
    return console.log("you updated this task" , tasks )
  }

  }
}
