import request from 'supertest'
import app from '../task.js'

describe('login', () => {
    it('should login user and send refresh token in cookies', async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
             "email": "baaala@gmail.com", 
             "password": "123415618"
        })

        expect(res.status).toBe(200)
        expect(res.body.accessToken).toBeDefined()
        expect(res.headers['set-cookie']).toBeDefined()
        // Verify refresh token cookie exists
        expect(res.headers['set-cookie'][0]).toMatch(/refreshToken=/)
    })

        it('should throw an error do to bad request', async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
             "email": "baaala@gmail.com"
        })
        expect(res.status).toBe(400)
    })
        // this will be since the user hasn't been registered yet
        it('should throw an error do to invalid credentials', async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
             "email": "baaala21@gmail.com", 
             "password": "123415618"
        })

        expect(res.status).toBe(401)
    })
})