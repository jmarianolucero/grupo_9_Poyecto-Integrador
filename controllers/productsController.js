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
	//Busca productos en la base de datos
	search: (req, res) => {
		Products.findAll({
			where: {
				name: { [Op.like]: `%${req.query.search}%` }
			}

		})
			.then(products => {
				res.render('search-products', { products: products })
			})
	},
	viento: (req, res) => {
		Products.findAll({
			include: ['categories'],
			where: {
				category_id: 3
			}

		})
			.then(products => {
				res.render('./categories/viento', { products: products })
			})
	},
	cuerdas: (req, res) => {
		Products.findAll({
			include: ['categories'],
			where: {
				category_id: 1
			}

		})
			.then(products => {
				res.render('./categories/cuerdas', { products: products })
			})
	},
	percusion: (req, res) => {
		Products.findAll({
			include: ['categories'],
			where: {
				category_id: 2
			}

		})
			.then(products => {
				res.render('./categories/percusion', { products: products })
			})
	},
	sonido: (req, res) => {
		Products.findAll({
			include: ['categories'],
			where: {
				category_id: 4
			}

		})
			.then(products => {
				res.render('./categories/sonido', { products: products })
			})
	},
	accesorios: (req, res) => {
		Products.findAll({
			include: ['categories'],
			where: {
				category_id: 5
			}

		})
			.then(products => {
				res.render('./categories/accesorios', { products: products })
			})
	},
	taller: (req, res) => {
		Products.findAll({
			include: ['categories'],
			where: {
				category_id: 6
			}

		})
			.then(products => {
				res.render('./categories/taller', { products: products })
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
				return res.render('new-product', { categorias: categorias, colors: colors })
			})
	},

	// Create - guarda un nuevo producto
	store: (req, res) => {
		const resultValidation = validationResult(req);
		let promCategories = Category.findAll();
		let promColors = Color.findAll();
		Promise.all([promCategories, promColors])
			.then(([categorias, colors]) => {
				if (resultValidation.errors.length > 0) {
					return res.render('new-product', {
						errors: resultValidation.mapped(),
						oldData: req.body,
						categorias: categorias,
						colors: colors,

					});
				} else {
					if (req.file) {
						Products
							.create({
								name: req.body.titulo,
								price: req.body.precio,
								description: req.body.descripcion,
								category_id: req.body.categoria,
								color_id: req.body.colores,
								image: req.file.filename
							})
							.then(() => {
								res.redirect('/products')
							})
							.catch((error) => {
								console.log(error)
							})
					}
				}

			})



	},


	// Update - Formulario de edición de un producto 
	edit: (req, res) => {
		let productId = req.params.id;
		let promProducts = Products.findByPk(productId);
		let promCategories = Category.findAll();
		let promColors = Color.findAll();
		Promise.all([promProducts, promCategories, promColors])
			.then(([products, categorias, colors]) => {
				res.render('edit-product.ejs', { products: products, categorias: categorias, colors: colors });
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
				} else {
					if (req.file) {
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
									where: { id: productId }
								})
							.then(() => {
								res.redirect('/products/' + req.params.id)
							})
							.catch((error) => {
								console.log(error)
							})
					}
				}
			})


	},

	// Delete - Borra un producto (soft delete)
	// FUNCIONA PERO HACE UN HARD DELETE. BORRA EL ELEMENTO DE LA BASE.
	destroy: function (req, res) {
		let productId = req.params.id;
		Products
			.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
			.then(() => {
				return res.redirect('/products')
			})
			.catch(error => res.send(error))
	}
};

module.exports = controller;