import  jwt  from "jsonwebtoken";
import  bcrypt  from "bcrypt"
import { Roles } from "../config/Roles.js";
import { pool } from '../database/db_task.js'
import { generateRefreshToken } from "../config/refreshToken.js";
import { Token_model } from "./token_model.js";

const saltrounds = Number(process.env.BCRYPT_SALT_ROUNDS.trim())

export class Auth_model{
   
    static async register(email , password){
      
    const hashedpassword = await bcrypt.hash(password , saltrounds )
    const user_id = crypto.randomUUID()
     
    const mistake = new Error('email already exists');

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
      const mistake = new Error('Invalid credentials')
      mistake.statusCode = 401

      const query =
      `SELECT user_id,user_role,user_password FROM users 
      WHERE user_email = ? `

      const [rows] = await pool.execute(query , [email])

      if(rows.length === 0){
        throw mistake
      }

      const user = rows[0]
      const Isvalid = await bcrypt.compare(password , user.user_password)
      if(!Isvalid) throw mistake

      const accessToken = jwt.sign(
        {email : email, id : user.user_id, role : user.user_role },
        process.env.signature,
        {expiresIn : '15m'}
      )
   
      const refreshToken = generateRefreshToken()
      await Token_model.save_token(user.user_id , refreshToken)

      return {accessToken , refreshToken}
 }
}
