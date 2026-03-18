const express = require('express');
const productosController = require('../controllers/productosController');

const router = express.Router();

router.get('/productos', productosController.listarProductos);
router.post('/productos', productosController.crearProducto);

module.exports = router;
