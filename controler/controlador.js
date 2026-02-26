import { Validar_Tarea } from "../middleware/zod.js"
import {db_model} from "../model/db_model.js";

export class db_controller{
    static async  getTasks (req, res) {
  try {
    const rows = await db_model.getTasks()
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting tareas" });
  }
};

  static async getByTitle(req,res){
      const {title} = req.params
      console.log("Searching for task with the title of:", title);
      
      const tareas = await db_model.getByTitle(title)
      if (tareas) return res.json(tareas)
      res.status(404).json({message: "Task not found"})
  }

  static async create (req,res){
     const result = Validar_Tarea(req.body)
                
    if (!result.success) {
    return res.status(400).json({ message: "Bad request" }) 
    }

    const existTask = await db_model.getByTitle(req.body.task_title);

    if (existTask) {
      return res.status(409).json({ message: "Task with this title already exists" });
    }
                
    const Nueva_tarea = await db_model.create({input: result.data})
    res.status(201).json({
    message: "Task created successfully",
    task: Nueva_tarea})
  }


  static async delete(req,res){
    const {title} = req.params
    console.log("Searching for task with the title of :", title)
    const tareas = await db_model.delete(title)
   if(tareas === null){
    console.log("Task " + title + " is not found")
    return  res.status(404).json({message: "Task not found"})
   } else {
      res.status(200).json({message : "Task deleted successfully"})
   }
  }

  static async update(req,res){
    const result = Validar_Tarea(req.body)
     if (!result.success) {
    return res.status(400).json({ message: "you put something invalid" }) 
    }

    const {title} = req.params
    const { task_description , task_title , task_situation } = result.data
    const existTask = await db_model.getByTitle(req.body.task_title);
    console.log("Searching for task with the title of:", title)
 
    const tareas = await db_model.update(title, task_description , task_title , task_situation)

    if(tareas === null){
    return  res.status(404).json({message: "Task not found"})
   }
    if (existTask && existTask.task_title !== title) {
      return res.status(409).json({ message: "Task with this title already exists" });
    }
    
    res.status(201).json({message : "Task " + title + " updated successfully"})
   
  }
}

