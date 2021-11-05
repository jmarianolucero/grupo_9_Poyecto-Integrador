const fs = require('fs');
const path = require('path');
const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Products = db.Product;
const Category = db.Category;

const productsFilePath = path.join(__dirname, '../data/products.json');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		Products.findAll({
			include: ['categories']
		})
			.then(products => {
				res.render('products.ejs', { products })
			})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		Products.findByPk(req.params.id)
			.then(products => {
				res.render('detail.ejs', { products });
			});
	},
	create: (req, res) => {
		Category.findAll()
		.then(categorias => {
			return res.render('new-product', {categorias : categorias})
		})
	},

	// Create -  Method to store
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

	// Update - Form to edit
	edit: (req, res) => {
		let productId = req.params.id;
		let promProducts = Products.findByPk(productId);
		let promCategories = Category.findAll();
		Promise.all([promProducts, promCategories])
			.then(([products, categorias]) => {
			res.render('edit-product.ejs', { products : products, categorias : categorias});
		});
	},
	// Update - Method to update
	update: (req, res) => {
		let idProduct = req.params.id;
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach(product => {
			if (product.id == idProduct) {
				product.name = req.body.name;
				product.price = req.body.price;
				product.discount = req.body.discount;
				product.category = req.body.category;
				product.description = req.body.description;
				product.color = req.body.color;
				if (req.file) {
					let indexProduct = products.findIndex(product => product.id == idProduct);
					let imagePath = path.join(__dirname, "../public/images/products", products[indexProduct].image);
					fs.unlink(imagePath, function (err) {
						if (err) {
							console.log('Could not delete file');
						};
					});
					product.image = req.file.filename;
				}
			}
		});
		let productsJSON = JSON.stringify(products, null, ' ');
		fs.writeFileSync(productsFilePath, productsJSON);
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	// FUNCIONA PERO HACE UN HARD DELETE. BORRA EL ELEMENTO DE LA BASE.
	destroy: function (req,res) {
        let productId = req.params.id;
        Products
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error))
	}
	//Nuevos controladores - A MEDIDA QUE VAN FUNCIONANDO LOS SACAMOS DE ACA Y BORRAMOS LOS ANTERIORES

	/*update: (req, res) => {
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
            return res.redirect('/products')})            
        .catch(error => res.send(error))
	},*/
};

module.exports = controller;