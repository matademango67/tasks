import { Auth_model } from "../model/auth_model.js";
import {Validate_User} from "../middleware/register_zod.js"
import { Token_model } from "../model/token_model.js";


export class Auth_controller{
    static async register(req,res){
        const result = Validate_User(req.body);
         if(!result.success) return res.status(400).json
         ({status: "fail",
         errors: result.error.flatten()
        })
       
        try {
            const user = await Auth_model.register(req.body.email, req.body.password);
            return res.status(201).json({ message : "user added", user });
        } catch(error) {
            if(error.statusCode === 409) {
                return res.status(409).json({ status: "fail", message: error.message });
            }
            return res.status(500).json({ status: "fail", message: error.message });
        }
    }

    static async login (req,res){
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ message : "Bad request"})
    }

    try {
        const { accessToken, refreshToken } =
            await Auth_model.login(req.body.email, req.body.password)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        return res.status(200).json({
            message : "Login successful",
            accessToken
        })

    } catch(error) {

        if(error.statusCode === 401) {
            return res.status(401).json({
                status: "fail",
                message: error.message
            })
        }
        return res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}

    static async logout (req,res){
    const refreshToken = req.cookies.refreshToken

  if(!refreshToken){
    res.status(400).json({message: 'No refresh token in cookies'})
    return
  }else{
    await Token_model.logout(refreshToken)
  }


  res.clearCookie('refreshToken' , {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  console.log('User logged out, refresh token cleared from cookies')

  res.status(204).send()
}
}