const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body } = require('express-validator');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    let folder = path.join(__dirname, '../public/images/users');
    callback(null, folder)
    },
    filename: (req, file, callback) => {
    let userImageName = Date.now() + path.extname(file.originalname);
    callback(null, userImageName);
    }
    });
    const fileUpload = multer({storage:storage});

const validations = [
    body('nombre').notEmpty().withMessage('Este campo no puede quedar vacío'),
    body('nick').notEmpty().withMessage('Este campo no puede quedar vacío'),
    body('dni').notEmpty().withMessage('Este campo no puede quedar vacío'),
    body('pass').notEmpty().withMessage('Este campo no puede quedar vacío'),
    body('email').notEmpty().withMessage('Este campo no puede quedar vacío')
];

//Rutas    
router.get('/', usersController.userhome);

//Home de login
router.get('/login', usersController.login);

//Home de register
router.get("/register", usersController.register);

//Procesar register
router.post("/",fileUpload.single('user-image'), validations, usersController.newUser);

module.exports = router;