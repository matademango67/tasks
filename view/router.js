import { Router } from "express";
//import {Task_controller} from '../controler/controlador.js'
import { db_controller } from '../controler/controlador.js';

export const TaskRouter = Router()

TaskRouter.get('/', db_controller.getTasks)
TaskRouter.post('/',db_controller.create )
TaskRouter.delete('/:title', db_controller.delete )
TaskRouter.get('/:title', db_controller.getByTitle)


 //Task_controller.create,