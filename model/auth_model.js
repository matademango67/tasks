import  jwt  from "jsonwebtoken";
import  bcrypt  from "bcrypt"
import { Roles } from "../config/Roles.js";
import { pool } from '../database/db_task.js'
import { generateRefreshToken } from "../config/refreshToken.js";
//import { TokenService } from "./token_services.js";

const saltrounds = Number(process.env.BCRYPT_SALT_ROUNDS.trim())

const mistake = new Error('email already exists');

export class Auth_model{
   
    static async register(email , password){
    const hashedpassword = await bcrypt.hash(password , saltrounds )
    const user_id = crypto.randomUUID()

    const query = 
    `INSERT INTO users (user_id , user_email , user_role , user_password)
        VALUES (?,?,?,?);`

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

 static async login (email , password){
      const error = new Error('Invalid credentials')
      error.statusCode = 401

      const query =
      `SELECT user_id,user_role,user_password FROM users 
      WHERE user_email = ? `

      const [rows] = pool.execute(query , [email])

      if(rows === 0){
        throw error
      }

      const Isvalid = bcrypt.compare(password , user.user_password)
      if(!Isvalid) throw error

      const accessToken = jwt.sign(
        {email : user_email, id : user_id, role : user_role },
        process.env.signature,
        {expiresIn : '15m'}
      )
   
      const refreshToken = generateRefreshToken()

      return {accessToken , refreshToken}
 }
}
