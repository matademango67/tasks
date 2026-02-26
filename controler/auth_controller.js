import { Auth_model } from "../model/auth_model";


export class Auth_controller{
    static async register(req,res){
        const user = Auth_model.register(req.body)
        res.status(201).json({ message : "user added" , user})
    }
}