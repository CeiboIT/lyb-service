var Product = require('../schemas/productSchema');
var populationOptions = require('../configs/general').populationOptions;
var logger = console;
var productService = {};

productService.create = function(productData) {
	var product = new Product(productData);
	logger.log('productService.create > ', productData);

	product.store = productData.store._id;
	return product.save();
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

productService.findProductByName = function(searchForName, callback) {

	var query = Product.find({name : searchForName});

	query.populate(populationOptions.seller);
	query.populate(populationOptions.categories);
	query.populate(populationOptions.store);
	query.exec(function(err, response){
		if(err) {
			return err;
		}
		callback(response);
	});
};

productService.findAll = function(storeId) {
	if (storeId) {
		return Product.find({store: storeId})
			.populate(populationOptions.categories)
			.populate(populationOptions.store)
			.populate(populationOptions.seller)
			.exec();
			//;function (err, products) {
			//	callback(err, products);
				// if (err) {
					// return err;
				// }
			//});
	} else {
		return Product.find()
		.populate(populationOptions.seller)
		.populate(populationOptions.categories)
		.populate(populationOptions.store)
		.exec();
		// .exec(function(err, response){
		// 	if(err) {
		// 		return err;
		// 	}
		// 	callback(response, err);
		// });
	}
};

productService.getProductById = function(productId, callback) {

	var query = Product.findOne({'_id': productId});
	query.populate(populationOptions.seller);
	query.populate(populationOptions.categories);
	query.populate(populationOptions.store);
	query.exec(function(err, response){
		if(err) {
			return err;
		}
		callback(response);
	});
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

module.exports = productService;