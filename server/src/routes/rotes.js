const {Router} = require('express')
const router = Router()
const {cnn_mysql} = require('../database/database');
const articulos = require('../items/info_prueba.json')

router.get('/articulos', (req, res) => {
    return res.send(articulos)
});

router.post('/compra', async(req, res) => {
    try {
        const {
            numero_orden,
            cliente,
            subtotal,
            iva,
            total
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO compras(numero_orden, cliente, subtotal, iva, total) 
            VALUES(?, ?, ?, ?, ?)`, [numero_orden, cliente, subtotal, iva, total]);

        if (rows.affectedRows > 0) {
            res.json({
                numero_orden: numero_orden,
                cliente: cliente,
                subtotal: subtotal,
                iva: iva,
                total: total,
            })
        } else {
            res.json({});
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message : "Error en el servidor"});
    }
});

router.get('/compras', (req, res) => {
    cnn_mysql.query(`SELECT numero_orden, subtotal, iva, total FROM compras`, (error, resulset) => {
        if (error) {
            return res.status(500).send('se presento un error en la base de datos.')
        } else {
            return res.json(resulset)
        }
    })
});

module.exports = router