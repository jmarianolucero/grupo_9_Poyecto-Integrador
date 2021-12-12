const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");


//Middlewares
const fileUpload = require('../middlewares/multerUsersMiddleware');
const registerValidations = require('../middlewares/validateRegisterMiddleware');
const loginValidations = require('../middlewares/validateLoginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



//Rutas    
/*router.get('/', usersController.userhome);*/

//Home de login
router.get('/login', guestMiddleware, usersController.login);

//Proceso de login
router.post('/login', loginValidations, usersController.loginProcess);

//Home de register
router.get("/register", guestMiddleware, usersController.register);

//Procesar register
router.post("/",fileUpload.single('userImage'), registerValidations, usersController.newUser);

//Perfil de Usuario
router.get("/profile", authMiddleware, usersController.profile);

//Editar usuario
router.get('/edit/:id', authMiddleware, usersController.edit);
router.put('/edit/:id', authMiddleware, fileUpload.single('avatar'), usersController.update);

//Logout
router.get('/logout/', usersController.logout);

//Borrar usuario
router.get('/delete/:id', authMiddleware, usersController.deleteProfile);
router.delete('/delete/:id', usersController.delete);

module.exports = router;