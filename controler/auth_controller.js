import { Auth_model } from "../model/auth_model.js";


export class Auth_controller{
    static async register(req,res){
        const user = await Auth_model.register(req.body.email, req.body.password)
        if(!req.body.email || !req.body.password) return res.status(400).json
        ({message : "bad request"})
        res.status(201).json({ message : "user added" , user})
    }

    static async login (req,res){
        const user = await Auth_model.register(req.body.email, req.body.password)

        if(!user) res.status(400).json({ message : "Bad request"})
    }
}