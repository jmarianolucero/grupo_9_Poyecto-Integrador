const path = require('path');
const multer = require('multer'); 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    let folder = path.join(__dirname, '../public/images/products');
    callback(null, folder)
    },
    filename: (req, file, callback) => {
    let userImageName = Date.now() + path.extname(file.originalname);
    callback(null, userImageName);
    }
    });
    const fileUpload = multer({storage:storage});


module.exports = fileUpload; 