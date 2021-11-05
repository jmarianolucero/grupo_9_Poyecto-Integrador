const express = require("express");
const path = require("path")
const router = express.Router();
const productsController = require("../controllers/productsController");

//Middlewares
const fileUpload = require('../middlewares/multerProductsMiddleware');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', fileUpload.single('product-image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', fileUpload.single("product-image"), productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 

module.exports = router;