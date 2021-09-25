const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/",mainController.home);
router.get('/shopping-cart',mainController.cart);


module.exports = router;