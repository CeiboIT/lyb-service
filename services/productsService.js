var Product = require('../schemas/productSchema');
var populationOptions = require('../configs/general').populationOptions

var productService = {};

productService.create = function(productData, callback) {

	var product = new Product(productData);

	product.save(function(err, response){
		if (err) return err;
		callback(response);
	});

}

productService.findProductByName = function(searchForName, callback) {

	var query = Product.find({name : searchForName})

	query.populate(populationOptions.seller);
	query.populate(populationOptions.categories);
	query.populate(populationOptions.store);
	query.exec(function(err, response){
		if(err) return err;
		callback(response);
	})

}

productService.findAll = function(callback) {

	Product.find()
	.populate(populationOptions.seller)
	.populate(populationOptions.categories)
	.populate(populationOptions.store)
	.exec(function(err, response){
		if(err) return err;
		callback(response);
	})

}

productService.getProductById = function(productId, callback) {

	var query = Product.findOne({"_id" : productId})
	query.populate(populationOptions.seller);
	query.populate(populationOptions.categories);
	query.populate(populationOptions.store);
	query.exec(function(err, response){
		if(err) return err;
		callback(response);
	})

}


productService.update= function(product, callback) {

	for (var i = product.categories.length - 1; i >= 0; i--) {
		product.categories[i] = product.categories[i]._id
	};

	product.seller = product.seller._id;

	Product.findByIdAndUpdate(product._id, product)
		.exec(function(err, product){
			if(err) callback({err : err});
			callback(product)
		});
}

module.exports = productService;