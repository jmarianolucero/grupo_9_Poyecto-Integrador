const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    let folder = path.join(__dirname, '../public/images/products');
    callback(null, folder)
    },
    filename: (req, file, callback) => {
    let imageName = Date.now() + path.extname(file.originalname);
    callback(null, imageName);
    }
    });
    const fileUpload = multer({storage:storage})

router.get('/', usersController.userhome);
router.get('/login', usersController.login);
router.get("/register",fileUpload.single('user-image'), usersController.register);

module.exports = router;