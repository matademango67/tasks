import { z } from 'zod';

const Task_eschema = z.object({

  task_description: z
    .string({ 
        invalid_type_error: 'El titulo debe ser una cadena de texto',
        require_error: 'Necesita un titulo',
     })
        .min (1, "La descripción no puede estar vacía")
        .max(110, "La descripción no puede tener más de 110 caracteres"),
    

    task_title: z
    .string({
      invalid_type_error: "El título debe ser una cadena de texto",
      required_error: "Necesita un título"
    })
    .min(1, "El título no puede estar vacío")
    .max(50, "El título no puede tener más de 50 caracteres"),
    
    task_situation: z.boolean({
        invalid_type_error:  "it has to be either true or false"
    })

});

export function Validar_Tarea(object){
     return Task_eschema.safeParse(object)
}