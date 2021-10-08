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
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre completo'),
    body('nick').notEmpty().withMessage('Debes ingresar un nombre de usuario'),
    body('dni').notEmpty().withMessage('Debes ingresar un DNI válido'),
    body('pass').notEmpty().withMessage('Este campo no puede quedar vacío'),
    body('repass').notEmpty().withMessage('Este campo no puede quedar vacío'),
    body('email').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('userImage').custom((value, { req }) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg', '.png'];
        
        if(!file){
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error('Los formatos válidos son .jpg o .png');
            }
        }
        
        return true
    })
];

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