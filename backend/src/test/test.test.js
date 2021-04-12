const request = require('supertest');
const dateformat = require('dateformat');
const faker = require('faker');
const app = require('./../../index');

describe('Prubas de los servicios', () => {
    it('verificar al leer archivo json', async() => {
        const res = await request(app)
        .get('/articulos')
        expect(res.statusCode).toEqual(200)
        expect(res.data)
    })

    it('verificar el json de compras', async() => {
        const res = await request(app)
        .get('/compras')
        expect(res.statusCode).toEqual(200)
        expect(res.data)
    })

    it('verificar al traer totales', async() => {
        const res = await request(app)
        .get('/totales')
        expect(res.statusCode).toEqual(200)
        expect(res.data)
    })

    it('verificar al guardar una compra', async() => {
        const res = await request(app)
            .post('/compra')
            .send({
                "numero_orden": faker.random.number(1000, 10000),
                "fecha": dateformat(faker.date.past(), "yyyy-mm-dthh:mm"), 
                "cliente": faker.name.firstName(),
                "subtotal": faker.random.number(),
                "iva": faker.random.number(),
                "total": faker.random.number()
              })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty("numero_orden")
    })
})