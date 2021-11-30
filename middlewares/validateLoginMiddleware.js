const path = require('path');
const { body } = require('express-validator');

module.exports = [
    
    body('email').notEmpty().withMessage('Este campo no puede quedar vacío').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Este campo no puede quedar vacío')
];