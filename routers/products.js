const express = require("express");
const path = require("path")
const router = express.Router();
const productsController = require("../controllers/productsController");

//Middlewares
const fileUpload = require('../middlewares/multerProductsMiddleware');
const productsValidations = require('../middlewares/validateProductsMiddleware');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);

//SEARCH PRODUCTS
router.get('/search', productsController.search);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', productsValidations, fileUpload.single('productImage'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsValidations, fileUpload.single('productImage'), productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 

module.exports = router;