import {pool } from '../database/db_task.js' 
import { hashToken } from "../config/refreshToken.js";
//import  jwt  from "jsonwebtoken"
import crypto from "node:crypto";

export class Token_model{

    static async save_token (user_id , refreshToken){
    const  token_id = crypto.randomUUID()
    const token_hash = hashToken(refreshToken)
      
      const expires = new Date()
        expires.setDate(expires.getDate() + 7)

    const query = `INSERT INTO refresh_tokens (Token_id , Token_hash , user_id, Token_expires)
            VALUES (?,?,?,?);`

       try {
    await pool.execute(query , [
        token_id,
        token_hash,
        user_id,
        expires
    ])
} catch (error) {
    console.error('Error saving token:', error);

     throw error
    }
}

    static async logout(refreshToken){

        if(typeof refreshToken !== 'string' || !refreshToken) return;

         const tokenHash = hashToken(refreshToken)
         
         await pool.execute(
            `DELETE FROM refresh_tokens WHERE Token_hash = ?`,
            [tokenHash]
         )
    }
}