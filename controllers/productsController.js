const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let allProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let products = allProducts.filter(i=>i.status =="able")
		res.render('products', {products : products}) 
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		idParams = req.params.id
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let productoAMostrar = products.find(n => n.id == idParams);
		res.render('detail', {product : productoAMostrar})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('new-product')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		console.log(req.file)
		let newProduct = {
			id: Date.now(),
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename,
		};
		
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect('/products')
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProduct = req.params.id;
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let productToEdit = products.filter(n => n.id == idProduct);
		res.render('edit-product', {productToEdit : productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let idProduct = req.params.id;
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach(product => {
			if (product.id == idProduct){
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
	destroy : (req, res) => {
		let idProduct = req.params.id;
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach(product => {
			if (product.id == idProduct){
				product.status = "disable"
				
			};
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		
		res.redirect('/products')

	}
};

module.exports = controller;