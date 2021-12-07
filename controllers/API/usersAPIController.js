const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const db = require('../../src/database/models');
const User = db.User;

const usersAPIController = {
    'list': (req, res) => {
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: '/api/user/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            });
    }
}

module.exports = usersAPIController;