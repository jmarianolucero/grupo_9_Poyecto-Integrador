const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Products = db.Product;
const Category = db.Category;
const Color = db.Color;

const productsAPIController = {
    'list': (req, res) => {
        Products.findAll({
            include: ['categories']
        })
        .then(products => {
            for (let i = 0; i < products.length; i++) {
                delete products[i].dataValues.categories.dataValues.id
                delete products[i].dataValues.category_id
                delete products[i].dataValues.color_id
                delete products[i].dataValues.created_at
                delete products[i].dataValues.updated_at
                delete products[i].dataValues.deleted_at
                
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }
                res.json(respuesta);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    
    'detail': (req, res) => {
        Products.findByPk(req.params.id,{
            include: ['categories']
        })
            .then(product => {
                    delete product.dataValues.categories.dataValues.id
                    delete product.dataValues.category_id
                    delete product.dataValues.color_id
                    delete product.dataValues.created_at
                    delete product.dataValues.updated_at
                    delete product.dataValues.deleted_at
        
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: `/api/products/${product.id}`
                    },
                    data: product
                }
                res.json(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = productsAPIController;