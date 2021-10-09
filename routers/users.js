const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");


//Middlewares
const fileUpload = require('../middlewares/multerUsersMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');



//Rutas    
router.get('/', usersController.userhome);

//Home de login
router.get('/login', usersController.login);

//Proceso de login
router.post('/login', usersController.loginProcess);

//Home de register
router.get("/register", usersController.register);

//Procesar register
router.post("/",fileUpload.single('userImage'), validations, usersController.newUser);

//Home de user
router.get("/user", usersController.profile);

module.exports = router;