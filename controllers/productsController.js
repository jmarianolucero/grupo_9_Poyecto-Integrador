const fs = require('fs');
const path = require('path');
const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Products = db.Product;
const Category = db.Category;

const productsFilePath = path.join(__dirname, '../data/products.json');

const controller = {
	// Index - muestra todos los productos
	index: (req, res) => {
		Products.findAll({
			include: ['categories']
		})
			.then(products => {
				res.render('products.ejs', { products })
			})
	},

	// Detail - Detalle de un producto
	detail: (req, res) => {
		Products.findByPk(req.params.id)
			.then(products => {
				res.render('detail.ejs', { products });
			});
	},
	// Create - Muestra formulario de creación
	create: (req, res) => {
		Category.findAll()
		.then(categorias => {
			return res.render('new-product', {categorias : categorias})
		})
	},

	// Create - guarda un nuevo producto
	store: (req, res) => {
		Products
        .create({
            name: req.body.titulo,
			price: req.body.precio,
			description: req.body.descripcion,
			category_id: req.body.categoria,
			color: req.body.colores,
			image: req.file.filename
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
    },

	// Update - Formulario de edición de un producto 
	edit: (req, res) => {
		let productId = req.params.id;
		let promProducts = Products.findByPk(productId);
		let promCategories = Category.findAll();
		Promise.all([promProducts, promCategories])
			.then(([products, categorias]) => {
			res.render('edit-product.ejs', { products : products, categorias : categorias});
		});
	},
	// Update - Actualiza los datos de un producto
	update: (req, res) => {
		let productId = req.params.id;
        Products
        .update(
            {
            name: req.body.titulo,
			price: req.body.precio,
			description: req.body.descripcion,
			category: req.body.categoria,
			color: req.body.color,
			image: req.file.filename
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            return res.redirect('/products/' + req.params.id)
		})            
        .catch(error => res.send(error))
	},

	// Delete - Borra un producto (soft delete)
	// FUNCIONA PERO HACE UN HARD DELETE. BORRA EL ELEMENTO DE LA BASE.
	destroy: function (req,res) {
        let productId = req.params.id;
        Products
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error))
	}
};

module.exports = controller;