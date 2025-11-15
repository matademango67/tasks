import fs from 'node:fs'
import path from 'node:path'


const json = path.join('tasks.json')
const data = fs.readFileSync(json, 'utf-8')
export const tasks = JSON.parse(data)

export class Las_Task {

    static async getAll(){}

    static async create(input){
        const New_Task = {
            ...input
        } 
        tasks.push(New_Task)
        return New_Task
    }

    static async update(){

    }

    static async delete(){
        const taskindex = tasks.findindex(task => task.title === title)
        if (taskindex === -1){
            return false
        } else {
            taskindex.splice(taskindex, 1)
             //fs.writeFile('../tasks.json', JSON.stringify(tasks, null, 2))
            return true
        }

    }

}

