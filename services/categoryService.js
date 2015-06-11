var Category = require('../schemas/categorySchema');
var logger = require('../configs/log');
var populationOptions = require('../configs/general').populationOptions;

var categoryService = {};

categoryService.create = function(categoryDetails) {
	var category = new Category(categoryDetails);
	return category.save();
	// if (categoryDetails.parent) {
		// return categoryService.getCategoryById(categoryDetails.parent._id)
			// .then(function (parentCategory) {
				// parentCategory.subCategories.push(category);
				// return parentCategory.save();
			// }, function (error) {
				// logger.log('error', 'Error creating a sub category. Parent not found', error);
				// throw { message: 'Service error' };
			// });
	// } else {
		// logger.log('categoryService.create > ', category);
		// return category.save();
	// }
};

categoryService.findAll = function() {
	return Category.find().exec();
};

categoryService.ordered = function() {
	var orderedCategories = {};
	return categoryService.getParents()
		.then(function (parents) {
			parents.forEach(function (parent) {
				orderedCategories[parent._id] = parent;
			});
			return categoryService.getChildren()
				.then(function (children) {
					children.forEach(function (child) {
						if (orderedCategories[child.parent].subCategories) {
							orderedCategories[child.parent].subCategories.push(child);
						} else {
							orderedCategories[child.parent].subCategories = [child];
						}
					});
					return orderedCategories;
				});
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

categoryService.getCategoryById = function(categoryId) {
	var query = Category.findOne({'_id': categoryId});
	query.populate(populationOptions.subCategories);
	return query.exec();
};

categoryService.getCategoryByTitle = function(title) {
	var query = Category.findOne({'title': title});
	return query.exec();
};

categoryService.getParents = function () {
	return Category.find({ parent: null })
		.exec();
};

categoryService.getChildren = function () {
	return Category.find({ parent: {$ne: null}})
		.exec();
};

module.exports = categoryService;

