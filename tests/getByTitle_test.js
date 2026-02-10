import request from 'supertest'
import app from '../task.js'

describe('getByTitle', () => {
    it('should only send one task with a matching title', async () => {
        const res = await request(app)
        .get('/Hacer manana')
        expect(res.status).toBe(200)
    })

    it('should throw an error', async () =>{
        const res = await request(app)
        .get('/adfghjfsddsfdf')
        expect(res.status).toBe(404)
    })
})