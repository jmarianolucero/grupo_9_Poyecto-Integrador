const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    let folder = path.join(__dirname, '../public/images/products');
    callback(null, folder)
    },
    filename: (req, file, callback) => {
    let imageName = Date.now() + path.extname(file.originalname);
    callback(null, imageName);
    }
    });
    const fileUpload = multer({storage})


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', fileUpload.any('product-image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/products/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/products/:id/edit', productsController.edit); 
router.put('/products/:id', productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/products/:id', productsController.destroy); 

module.exports = router;