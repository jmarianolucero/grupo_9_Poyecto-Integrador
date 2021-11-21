const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");


//Middlewares
const fileUpload = require('../middlewares/multerUsersMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



//Rutas    
/*router.get('/', usersController.userhome);*/

//Home de login
router.get('/login', guestMiddleware, usersController.login);

//Proceso de login
router.post('/login', usersController.loginProcess);

//Home de register
router.get("/register", guestMiddleware, usersController.register);

//Procesar register
router.post("/",fileUpload.single('userImage'), validations, usersController.newUser);

//Home de user
router.get("/profile", authMiddleware, usersController.profile);

module.exports = router;