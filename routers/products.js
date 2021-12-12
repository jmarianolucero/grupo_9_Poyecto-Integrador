const express = require("express");
const path = require("path")
const router = express.Router();
const productsController = require("../controllers/productsController");

//Middlewares
const fileUpload = require('../middlewares/multerProductsMiddleware');
const productsValidations = require('../middlewares/validateProductsMiddleware');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);

//CATEGORÍAS
router.get('/viento', productsController.viento);
router.get('/cuerdas', productsController.cuerdas);
router.get('/percusion', productsController.percusion);
router.get('/sonido', productsController.sonido);
router.get('/accesorios', productsController.accesorios);
router.get('/taller', productsController.taller);

//SEARCH PRODUCTS
router.get('/search', productsController.search);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/',  fileUpload.single('productImage'), productsValidations, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id',  fileUpload.single('productImage'), productsValidations, productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 

module.exports = router;