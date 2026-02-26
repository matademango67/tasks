import { Router } from "express";
import { Auth_controller} from '../controler/auth_controller.js'

export const UserRouter = Router()

UserRouter.post('/h' , Auth_controller.register)