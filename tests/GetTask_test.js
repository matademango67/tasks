import request from 'supertest'
import app from '../task.js'

describe('GetTask', () => {
    it('should send all the tasks that are in the server', async () => {
        const res = await request(app)
        .get('/')
        expect(res.status).toBe(200)
    })
})