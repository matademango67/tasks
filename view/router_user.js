import { Router } from "express";
import { Auth_controller} from '../controler/auth_controller.js'

export const UserRouter = Router()

UserRouter.post('/register' , Auth_controller.register)
UserRouter.post('/login' , Auth_controller.login)
UserRouter.delete('/logout' , Auth_controller.logout)