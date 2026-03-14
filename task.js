import express, { json } from 'express'
import { TaskRouter } from "./view/router.js"
import { UserRouter } from "./view/router_user.js"
import path from 'path'
import cookieParser from 'cookie-parser'

import dotenv from "dotenv";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

import cors from "cors";

app.use(cors({
  origin: 'http://localhost:5500', // or whatever origin your frontend runs on
  credentials: true                // this sets Access-Control-Allow-Credentials: true
}));


app.use(json())
app.use(cookieParser()) 

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})

app.use(TaskRouter)
app.use('/auth', UserRouter) 

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "frontend")));

export default app