const express = require('express');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config();
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 5002);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const options = {
   definition: {
     openapi: '3.0.0',
     info: {
       title: 'Hello World',
       version: '1.0.0',
     },
   },
   basePath: '/',
   apis: ['.src/routes/routes.js'],
 };

const specs = swaggerJsDoc(options)

/**
 * @openapi
 * /costomers:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/costomers", (req, res) => {
   res.send("Costomer results")
})

//Importar rutas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/', require('./src/routes/routes'))

app.listen(app.get('port'),()=>{
   console.log(`Servidor conectado en el puerto ${app.get('port')}`);
});

module.exports = app