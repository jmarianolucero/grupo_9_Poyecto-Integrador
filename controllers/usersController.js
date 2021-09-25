const fs = require('fs');
const path = require('path');

const controller = {
    userhome: (req, res)=>{
        res.render('user')
    },
    login:(req,res)=>{
        res.render("login")
    },
    register:(req,res)=>{
        res.render("register")},
};

module.exports = controller;