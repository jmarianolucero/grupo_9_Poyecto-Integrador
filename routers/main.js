const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/",mainController.home);
router.get("/register",mainController.register);
router.get('/product', mainController.product);
router.get('/carrito',mainController.cart);
router.get('/login', mainController.login);
router.get('/new-product', mainController.newProduct);

module.exports = router;