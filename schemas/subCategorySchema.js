var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var subCategorySchema = new Schema({
	title: String,
	description: String
});

module.exports = mongoose.model('SubCategory', subCategorySchema);