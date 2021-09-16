const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/",mainController.home);
router.get("/register",mainController.register);
router.get('/shopping-cart',mainController.cart);
router.get('/login', mainController.login);


module.exports = router;