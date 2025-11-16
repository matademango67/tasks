import { Validar_Tarea } from "../model/zod.js"
import { Las_Task , tasks ,  } from "../model/model.js"
import {db_model} from "../database/db_task.js";
import  pool  from "../database/db_task.js";

export class db_controller{
    static async  getTasks (req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM tareas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting tareas" });
  }
};

  static async getByTitle(req,res){
      const {title} = req.params
      console.log("Buscando tarea con título:", title);
      
      const tareas = await db_model.getByTitle(title)
      if (tareas) return res.json(tareas)
      res.status(404).json({message: "Tarea no encontrada"})
  }

  static async create (req,res){
     const result = Validar_Tarea(req.body)
                
    if (!result.success) {
    return res.status(400).json({ error: result.error }) 
    }
                
    const Nueva_tarea = await db_model.create({input: result.data})
    res.status(201).json(Nueva_tarea)
  }


  static async delete(req,res){
    const {title} = req.params
    console.log("Buscando tarea con título:", title)
    const tareas = await db_model.delete(title)
   if(tareas === null){
    return  res.status(404).json({message: "Tarea no encontrada"})
   }
  }


}


export class Task_controller {
    static async getAll (req,res){
        res.json(tasks)
    }

    static async create (req,res){
      const result = Validar_Tarea(req.body)

      if(!result.success){
         return res.status(400).json({ error: result.error }) 
      }

       const New_Task = await Las_Task.create({input: result.data})
       res.status(201).json(New_Task)
    }

    

    static async delete (req,res){ 
       const  { title } = req.params  
        if( !title){
          res.status(404).json({message : "no se encuentra la tarea"})
        } else {
            res.status(201).json({message : "tarea eliminada con exito"})
        }
    }
}