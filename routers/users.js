const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");
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
    const fileUpload = multer({storage:storage})

router.get('/', usersController.userhome);
router.get('/login', usersController.login);
router.get("/register", usersController.register);
router.post("/",fileUpload.single('user-image'), usersController.newUser);

module.exports = router;