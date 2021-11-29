const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre completo').bail().isLength({min : 2}).withMessage('Debe tener más de dos caracteres'),
    body('nick').notEmpty().withMessage('Debes ingresar un nombre de usuario').bail().isLength({min : 2}).withMessage('Debe tener más de dos caracteres'),
    body('dni').notEmpty().withMessage('Debes ingresar un DNI válido'),
    body('pass').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isLength({min : 8}).withMessage('Debe tener al menos 8 caracteres'),
    body('repass').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isLength({min : 8}).withMessage('Debe tener al menos 8 caracteres'),
    body('email').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('userImage').custom((value, { req }) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        
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