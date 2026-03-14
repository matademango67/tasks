import request from 'supertest'
import app from '../task.js'

describe('logout', () => {
    it('should logout user and clear refresh token', async () => {
        // First login to get a refresh token
        const loginRes = await request(app)
        .post('/auth/login')
        .send({
             "email": "baaala@gmail.com", 
             "password": "123415618"
        })
        
        // Then logout with the refresh token in cookies
        const logout = await request(app)
        .delete('/auth/logout')
        .set('Cookie', loginRes.headers['set-cookie'])
        expect(logout.status).toBe(204)

    })

    it('should throw error when no refresh token in cookies', async () => {
        const res = await request(app)
        .delete('/auth/logout')
        expect(res.status).toBe(400)
    })
})