const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

/*** GET ALL PRODUCTS ***/ 
router.get('/products', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/products/create', productsController.create); 
router.post('/products', productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/products/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/products/:id/edit', productsController.edit); 
router.put('/products/:id', productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/products/:id', productsController.destroy); 

module.exports = router;