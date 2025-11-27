import express, { json } from 'express'
//import { tasks } from "./model/model.js"
import { TaskRouter } from "./view/router.js"
import cors from "cors"
import path from 'path'

import dotenv from "dotenv";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors());
app.use(json()) 

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})

app.use(TaskRouter) 

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "frontend")));