var Category = require('../schemas/categorySchema');
var logger = console;
// var SubCategory = require('../schemas/subCategorySchema');
var populationOptions = require('../configs/general').populationOptions;

var categoryService = {};

categoryService.create = function(categoryDetails, callback) {
	var category = new Category(categoryDetails);
	logger.log('categoryService.create > ', category);
	category.save(function(err){
		if (err) {
			logger.error('categoryService.create > ' + err);
			return err;
		}
		callback(200);
	});
};

categoryService.findAll = function(callback) {
	Category.find({}, function(err, response){
		if (err) return err;
	  	callback(response);
	});
};

categoryService.update = function(category, callback) {
	Category.findByIdAndUpdate(category._id,
		{ $set: { title: category.title, description: category.description }},
		function (err, updatedCategory) {
	  		if (err) return err;
	  		callback(updatedCategory);
		});
};

categoryService.getCategoryById = function(categoryId, callback) {
	var query = Category.findOne({'_id': categoryId});
	query.populate(populationOptions.subCategories);
	query.exec(function(err, response){
		if(err) return err;
		callback(response);
	});
};
module.exports = categoryService;

