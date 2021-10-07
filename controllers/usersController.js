const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const { validationResult } = require('express-validator');
const User = require("../models/Users");
const bcryptjs = require ("bcryptjs");

const controller = {
    userhome: (req, res)=>{
        res.render('user')
    },
    login:(req,res)=>{
        res.render("login")
    },
    /*loginProcess:(req,res)=>{

        let userToLogin = User.findByField("email",req.body.email);
        if(userToLogin){ 
            delete userToLogin.password;
            req.session.userLoged = userToLogin;
            let isOkPassword =bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(isOkPassword){
                res.send("contraseña valida")
                //si funciona cambiar por res.redirect("/user")
            }
            return res.render("login",{
                errors:{
                    email:{
                msg:"credenciales invalidas"
                    }
                }
            });
        } 
        return res.render("login",{
                    errors:{
                        email:{
                    msg:"no se encuentra el email"
                        }
                    }
                });

    },*/

    profile:(req,res)=>{
        return res.render("user",{
            user:req.session.userLoged
        })
    },

    register:(req,res)=>{
        res.render("register")
    },
    newUser: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        /*
        let userInDB = User.findByField("email", req.body.email);
        
        if (userInDB){
            return res.render('register', {
                errors: {
                    email:{
                        msg:"Este email ya esta registrado"
                    }
                },
                oldData: req.body
            });
        }
        
        let userToCreate={
            ...req.body,
            password:bcryptjs.hashSync(req.body.password,10),
            image:req.file.filename
        }
        User.create(userToCreate)
        */

        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		console.log(req.file)
		let newUser = {
			id: Date.now(),
			name: req.body.nombre,
			userName: req.body.nick,
			dni: req.body.dni,
            password: req.body.pass,
            email: req.body.email,
			image: req.file.filename
				
		};
        users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

		res.redirect('/users')
    }
};

module.exports = controller;