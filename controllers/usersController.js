const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const controller = {
    userhome: (req, res)=>{
        res.render('user')
    },
    login:(req,res)=>{
        res.render("login")
    },
    register:(req,res)=>{
        res.render("register")
    },
    new: (req, res) => {
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