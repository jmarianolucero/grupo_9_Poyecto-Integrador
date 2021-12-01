const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Products = db.Product;
const Category = db.Category;
const Color = db.Color;

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
		let promCategories = Category.findAll();
		let promColors = Color.findAll();
		Promise.all([promCategories, promColors])
		.then(([categorias, colors]) => {
			return res.render('new-product', {categorias : categorias, colors : colors})
		})
	},

	// Create - guarda un nuevo producto
	store: (req, res) => {
		let promCategories = Category.findAll();
		let promColors = Color.findAll();
		Promise.all([promCategories, promColors])
		.then(([categorias, colors]) => {
			const resultValidation = validationResult(req);
			if (resultValidation.errors.length > 0) {
				return res.render('new-product', {
				categorias : categorias,
				colors : colors,
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} 
		})
		if (req.file) {
			/*if(req.file.filename){*/
				Products
        		.create({
				name: req.body.titulo,
				price: req.body.precio,
				description: req.body.descripcion,
				image: req.file.filename,
				category_id: req.body.categoria,
				color_id: req.body.color,
				})
				.then(()=> {
				res.redirect('/products/')})
				.catch(error => res.send(error))

			/*}*/
			
			} 
    },
	

	// Update - Formulario de edición de un producto 
	edit: (req, res) => {
		let productId = req.params.id;
		let promProducts = Products.findByPk(productId);
		let promCategories = Category.findAll();
		let promColors = Color.findAll();
		Promise.all([promProducts, promCategories, promColors])
			.then(([products, categorias, colors]) => {
			res.render('edit-product.ejs', { products : products, categorias : categorias, colors : colors});
		});
	},
	// Update - Actualiza los datos de un producto
	update: (req, res) => {
		let productId = req.params.id;
		let promProducts = Products.findByPk(productId);
		let promCategories = Category.findAll();
		let promColors = Color.findAll();
		Promise.all([promProducts, promCategories, promColors])
			.then(([products, categorias, colors]) => {
				const resultValidation = validationResult(req);
				if (resultValidation.errors.length > 0) {
					return res.render('edit-product', {
					products,
					categorias,
					colors,
					errors: resultValidation.mapped(),
					oldData: req.body
				});
		}
	})
		
		
        Products
        .update(
            {
            name: req.body.titulo,
			price: req.body.precio,
			description: req.body.descripcion,
			category_id: req.body.categoria,
			color_id: req.body.color,
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