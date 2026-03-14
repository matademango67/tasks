import request from 'supertest'
import app from '../task.js'



describe('/register' ,() => {
    it('should give an error due to the email already exists' , async () =>{
        const register = await request (app)
        .post('/auth/register')
        .send({
             "email": "baladababa@gmail.com" ,
             "password": "123456789"
        })
        expect(register.status).toBe(409)
    })

    it('should be successful' , async () =>{
        const register = await request (app)
        .post('/auth/register')
        .send({
            "email": "a1a1lasaas3@gmail.com",
            "password": "123456888"
        })
        expect(register.status).toBe(201)
    })

    it('should throw an error due to a bad request' , async () => {
        const register = await request(app)
        .post('/auth/register')
        .send({
            "email" : "1sa1a1ssda@gmail.com"
        })
        expect(register.status).toBe(400)
    })

    it('should throw an error due to bad input' , async () => {
        const register = await request(app)
        .post('/auth/register')
        .send({
            "email" : "1sa1as1sda@gmail.com",
            "password" : "1234"
        })
        expect(register.status).toBe(400)
    })

})