var Product = require('../schemas/productSchema');
var populationOptions = require('../configs/general').populationOptions;
var likeService = require('../services/likeService');
var logger = console;
var productService = {};

productService.create = function(productData, user) {
	var categoriesId = [];

	productData.categories.forEach(function (category) {
		categoriesId.push(category._id);
	});
	delete productData.categories;
	var product = new Product(productData);
	product.categories = categoriesId;

	logger.log('productService.create > ', productData);

	product.store = user.store._id;
	return product.save()
		.then(function(savedProduct) {
			return Product.populate(savedProduct, {path: 'categories'});
		});
};

productService.delete = function(productId, callback) {
	Product.findOne({'_id' : productId}).
	remove(function (err) {
		if (err) {
			logger.error('product > delete > ' , err);
		}
		callback(200);
	});
};

productService.findAll = function(user) {
	if (user.store && user.store._id) {
		return Product.find({store: user.store._id})
			.populate(populationOptions.categories)
			.populate(populationOptions.store)
			.populate(populationOptions.seller)
			.exec();
	} else {
		return Product.find()
			.populate(populationOptions.seller)
			.populate(populationOptions.categories)
			.populate(populationOptions.store)
			.exec();
	}
};

productService.getProductById = function(productId) {
	var query = Product.findOne({'_id': productId});
	query.populate('parent');
	query.populate(populationOptions.seller);
	query.populate(populationOptions.store);
	return query.exec();
};

productService.update= function(product, callback) {
	var productId = product._id;
	delete product._id;
	
	Product.findByIdAndUpdate(productId,
		product,
		function(err, store){
			if(err) {
				logger.error('productService.update', err);
				callback({err : err});	
			}
			callback(store);
		});
};

productService.like = function (productId, user) {
	return productService.getProductById(productId)
		.then(function (product) {
			return likeService.likeProduct(product, user);
		});
};

module.exports = productService;