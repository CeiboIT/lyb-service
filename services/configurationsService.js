var Size = require('../schemas/sizeSchema');

var configurationService = {};

configurationService.create = function(categoryDetails, callback) {
	var category = new Category(categoryDetails);

	category.save(function(err, response){
		if(err) return err;
		callback(200);
	})

}

configurationService.findAll = function(callback) {
	Category.find({}, function(err, response){
		if (err) return err;
	  	callback(response);
	})
}

configurationService.update = function(category, callback) {
	Category.findByIdAndUpdate(category._id, { $set: { description: category.description }}, function (err, updatedCategory) {
	  if (err) return err;
	  callback(updatedCategory);
	});

}

module.exports = configurationService;

