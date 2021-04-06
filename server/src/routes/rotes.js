const {Router} = require('express')
const router = Router()
const articulos = require('../items/info_prueba.json')

router.get('/articulos', (req, res) => {
    return res.send(articulos)
});

module.exports = router