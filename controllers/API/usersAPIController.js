const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const db = require('../../src/database/models');
const User = db.User;

const usersAPIController = {
    'list': (req, res) => {
        User.findAll()
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                delete users[i].dataValues.user_name
                delete users[i].dataValues.password
                delete users[i].dataValues.category
                delete users[i].dataValues.created_at
                delete users[i].dataValues.updated_at
                delete users[i].dataValues.deleted_at
                
            }

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
                    delete user.dataValues.user_name
                    delete user.dataValues.password
                    delete user.dataValues.category
                    delete user.dataValues.created_at
                    delete user.dataValues.updated_at
                    delete user.dataValues.deleted_at
            
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: `/api/users/${user.id}`
                    },
                    data: user
                }
                res.json(respuesta);
            });
    }
}

module.exports = usersAPIController;