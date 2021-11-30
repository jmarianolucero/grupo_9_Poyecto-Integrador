const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('titulo').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isLength({min : 5}).withMessage('Debe tener más de cinco caracteres'),
    body('descripcion').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isLength({min : 20}).withMessage('Debe tener al menos 20 caracteres'),
    body('productImage').custom((value, { req }) => {
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