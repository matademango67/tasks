import { z } from 'zod';

const Task_eschema = z.object({

  task_description: z
    .string({ 
        invalid_type_error: 'The title must be a string',
        require_error: 'You need a title',
     })
        .min (5, "The description must have more than 5 characters")
        .max(110, "The description cannot have more than 110 characters"),
    

    task_title: z
    .string({
      invalid_type_error: "The title must be a string",
      required_error: "You need a title"
    })
    .min(3, "The title must have more than 3 characters")
    .max(50, "The title cannot have more than 50 characters"),
    
    task_situation: z.boolean({
        invalid_type_error:  "it has to be either true or false"
    })

});

export function Validar_Tarea(object){
     return Task_eschema.safeParse(object)
}