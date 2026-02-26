import  jwt  from "jsonwebtoken";
import  bcrypt, { hash }  from "bcrypt"
import { Roles } from "../config/Roles.js";
import { pool } from '../database/db_task.js'
import { generateRefreshToken } from "../config/refresh.js";
import { TokenService } from "./token_services.js";

const saltrounds = Number(process.env.BCRYPT_SALT_ROUNDS)


export class Auth_model{
   
    static async register(email , password){
    hashedpassword = await bcrypt.hash(password , saltrounds )
    user_id = crypto.randomUUID()

    const query = 
    `INSERT INTO users (user_id , user_email , user_role , user_password)
        VALUES (?,?,?,?);`

        const mistake = new Error('email already exists');

      try {
        await pool.execute(query,[
        user_id,
        email,
        Roles.user,
        hashedpassword
      ])
      
      return {
        user_id : user_id,
        email,
        role: Roles.user,}

      } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){
            mistake.statusCode = 409;
        }
        } 

        throw mistake;
    
}
}
