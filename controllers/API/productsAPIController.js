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
       let promProducts = Products.findAll({
            attributes: ['id', 'name', 'price', 'description', 'image']
        })
        let promCategories = Category.findAll({
            attributes: ['name']
        });
		Promise.all([promProducts, promCategories])
        .then(([products, categories]) => {
            for (let i = 0; i < products.length; i++) {
                products[i].setDataValue('image', `http://localhost:3001/public/images/products/${products[i].image}`)
                
                
            }
            let respuesta = {
                totalProd: products.length,
                totalCat: categories.length,
                //categorias: categories.length,
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
            attributes: ['id', 'name', 'price', 'description', 'image'],
            include: ['categories']
        })
            .then(product => {
                    product.setDataValue('image', `http://localhost:3001/public/images/products/${product.image}`)
                    delete product.dataValues.categories.dataValues.id
        
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