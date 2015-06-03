var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	title: String,
	description: String,
	parent: { type: Schema.Types.ObjectId, ref: 'Category' },
	// properties : {},
	// subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model('Category', categorySchema);