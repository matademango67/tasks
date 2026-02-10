import request from 'supertest'
import app from '../task.js'

describe('Delete', () => {
    it('should delete the task of the title given', async () => {
        const login = await request(app)
        .post('/')
        .send({
          "task_description": "esto es para probar el delete",
          "task_title": "deletes test",
          "task_situation": false
        })
        expect(login.status).toBe(201)

        const res = await request(app)
        .delete('/deletes test')
        expect(res.status).toBe(200)
    })

    it('should throw an error since the task doesnt exist', async () => {
        const res = await request(app)
        .delete('/casimiro')
        expect(res.status).toBe(404)
    })
})