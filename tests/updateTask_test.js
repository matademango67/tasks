import request from 'supertest'
import app from '../task.js'

describe('Update', () => {
    it('should update the task of the title given', async () => {
        const update = await request(app)
        .patch('/Almuerzo')
        .send({
          "task_description": "esto es para probar el update",
          "task_title": "actualixacion de tarea",
          "task_situation": true
        })
        expect(update.status).toBe(201)
    })

    it('should throw an error since the task doesnt exist', async () => {
        const res = await request(app)
        .patch('/cena')
        .send({
          "task_description": "esto es para probar el update",
          "task_title": "actualixacion de tarea",
          "task_situation": true
        })
        expect(res.status).toBe(404)
    })
})

   it('should throw an error since the title is repeated', async () => {
        const res = await request(app)
        .patch('/Almuerzo')
        .send({
          "task_description": "deberia dar error",
          "task_title": "actualixacion de tarea",
            "task_situation": false
        })
        expect(res.status).toBe(409)
    })

    it('should return everything to normal ', async () => {
        const res = await request(app)
        .patch('/actualixacion de tarea')     
        .send({
          "task_description": "deberia regesar a la normalidad",
          "task_title": "Almuerzo",
            "task_situation": false
        })
        expect(res.status).toBe(201)
    })