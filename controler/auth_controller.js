import { Auth_model } from "../model/auth_model.js";
import {Validate_User} from "../middleware/register_zod.js"


export class Auth_controller{
    static async register(req,res){
        const result = Validate_User(req.body);
         if(!result.success) return res.status(400).json
         ({status: "fail",
         errors: result.error.flatten()
        })
       
        res.status(201).json({ message : "user added" , result})
    }

    static async login (req,res){
        const user = await Auth_model.login(req.body.email, req.body.password)

        if(!user) res.status(400).json({ message : "Bad request"})
        
        try{
        const refreshToken = await Auth_model.login(refreshToken)
        if(!refreshToken) return res.status(400).json
        ({ message : "no refresh token"})
        } catch {

        }
    }
}