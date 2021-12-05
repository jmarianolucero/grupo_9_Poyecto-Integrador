const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Products = db.Product;
const Category = db.Category;
const Color = db.Color;

const controller = {
    "home":(req,res)=>{
        Products.findAll({
			include: ['categories'],
            limit: 4
		})
			.then(products => {
				res.render('home', { products })
			})
    },
    "cart":(req,res)=>{
        res.render("shopping-cart")
    }
}

module.exports = controller