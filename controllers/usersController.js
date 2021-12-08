const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const { validationResult } = require('express-validator');
const db = require('../src/database/models');
const User = db.User;
const bcryptjs = require ("bcryptjs");


const controller = {
    /*userhome: (req, res)=>{
        res.render('profile')
    },*/
    login:(req,res)=>{
        res.render("login")
    },
    loginProcess:(req,res)=>{
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
          return res.render('login', {
              errors: resultValidation.mapped(),
              oldData: req.body
          });
      }
            User.findAll()
              .then(users => {
                let userToLogin = users.find(i => i.email == req.body.email)
        
                if (userToLogin) {
                  let isOkThePassword = bcryptjs.compareSync(
                    req.body.password,
                    userToLogin.password,
                  )
                  if (isOkThePassword) {
                    delete userToLogin.password
                    req.session.userLogged = userToLogin
        
                    if (req.body.rememberMe) {
                      res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 30 }) 
                    }
        
                    return res.redirect('/users/profile')
                  }
        
                  return res.render('login', {
                    errors: {
                      password: {
                        msg: 'Contraseña incorrecta',
                      },
                    },
                  })
                }
        
                return res.render('login', {
                  errors: {
                    email: {
                      msg: 'No existe el usuario',
                    },
                  },
                })
              })
          },

        /*let userToLogin = User.findByField("email",req.body.login);
        if(userToLogin){ 
            delete userToLogin.password;
            req.session.userLoged = userToLogin;
            let isOkPassword =bcryptjs.compareSync(req.body.password, userToLogin.pass);
            if(isOkPassword){
                res.redirect("/users/user")
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

    profile: (req, res) => { 
        User.findByPk(parseInt(req.session.userLogged.id))
          .then(user => {
            res.render('profile', {user})
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
        
        User.findAll()
        .then(users => {
            let userInDB = users.find(i => i.email == req.body.email)
            if (userInDB){
                return res.render('register', {
                    errors: {
                        email:{
                            msg:"Este email ya esta registrado"
                        }
                    },
                    oldData: req.body
                })
            } else {
                User.create({
                    full_name: req.body.nombre,
                    user_name: req.body.nick,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.pass, 10),
                    avatar: req.file.filename
                })
                .then (() => {
                    return res.redirect('/users/login')
                })
                .catch((error) =>{
                    console.log(error)
                })
            }
        })
    },
    edit: (req, res) => {
      User.findByPk(parseInt(req.params.id))
        .then(function (userToEdit) {
        res.render('edit-user', { userToEdit })
      })
    },
  
    update: (req, res) => {
      let id = req.params.id
      User.findByPk(id)
        .then(theUser => {
          User.update(
            {
              full_name: req.body.full_name || theUser.full_name,
              user_name: req.body.user_name || theUser.user_name,
              email: req.body.email || theUser.email,
              password: req.body.password == "" ? theUser.password : bcryptjs.hashSync(req.body.password, 10),
              avatar: req.file == undefined ? theUser.avatar : req.file.filename,
            },
            {
              where: {
                id: id,
              },
            },
        )
            .then(() => {
              return res.redirect('/users/profile/')
            })
            .catch((error) => res.send(error))
        })
    },
  
    logout: (req, res) => {
      res.clearCookie('userEmail')
      req.session.destroy()
      return res.redirect('/')
    },
    deleteProfile: (req, res) => { 
      User.findByPk((req.session.userLogged.id))
        .then(user => {
          res.render('deleteProfile', {user})
      })
    
    },
  
    delete: function (req, res) {
       User.destroy({
              where: {id: (req.params.id)},force: true}) // force: true es para asegurar que se ejecute la acción
          .then(() => {
              return res.redirect('/')
          })
          .catch(error => res.send(error))
        }
};

module.exports = controller;