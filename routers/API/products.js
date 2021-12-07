const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de todos los usuarios
router.get('/', productsAPIController.list);
//Detalle del actor
router.get('/:id', productsAPIController.detail);


module.exports = router;