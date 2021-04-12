const express = require('express')
const router = express.Router()
const {pool} = require('../database/database')
const articulos = require('../items/info_prueba.json')

/**
 * @openapi
 * /articulos:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/articulos', (req, res) => {
    return res.send(articulos)
});

router.post('/compra', async(req, res) => {
    try {
        const {
            numero_orden,
            fecha,
            cliente,
            subtotal,
            iva,
            total
        } = req.body
        const client = await pool.connect()
        const response = await client.query(
            'INSERT INTO compras(numero_orden, fecha, cliente, subtotal, iva, total) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            [numero_orden, fecha, cliente, subtotal, iva, total])

        if (response.rowsCount > 0) {
            res.json({
                id: response.rows[0].id,
                numero_orden: numero_orden,
                fecha: fecha,
                cliente: cliente,
                subtotal: subtotal,
                iva: iva,
                total: total,
            })
        } else {
            res.json({});
        }
    } catch (e) {
        console.log(e.error)
        res.status(500).json({errorCode : e.errno, message : "Error en el servidor"});
    } finally {
        client.release(true);
    }
});

router.get('/compras', async(req, res) => {
    const client = await pool.connect()
    
    client.query(`SELECT * FROM compras`, (error, resulset) => {
        client.release(true);

        if (error) {
            console.log(error)
            return res.status(500).send('se presento un error en la base de datos.')
        } else {
            return res.json(resulset.rows)
        }
    })
});

router.get('/totales', async(req, res) => {
    const client = await pool.connect()

    client.query(`SELECT SUM(subtotal) as total_subtotal, SUM(iva) as total_iva, 
        SUM(total) as total_compras FROM compras`, (error, resulset) => {
        client.release(true);

        if (error) {
            console.log(error)
            return res.status(500).send('se presento un error en la base de datos.')
        } else {
            return res.json(resulset.rows)
        }
    })
})

module.exports = router