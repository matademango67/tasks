import request from 'supertest'
import app from '../task.js'



describe('/auth' ,() => {
    it('should give an error due to the email already exists' , async () =>{
        const register = await request (app)
        .post('/auth/register')
        .send({
             "email": "baladababa@gmail.com" ,
             "password": "123456"
        })
        expect(register.status).toBe(409)
    })

    it('should be successful' , async () =>{
        const register = await request (app)
        .post('/auth/register')
        .send({
            "email": "aalasaas@gmail.com",
            "password": "123456"
        })
        expect(register.status).toBe(201)
    })

    it('should throw an error due to a bad request' , async () => {
        const register = await request(app)
        .post('/auth/register')
        .send({
            "email" : "saassda@gmail.com"
        })
        expect(register.status).toBe(400)
    })

})