var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	title: String,
	description: String,
	parent: { type: Schema.Types.ObjectId, ref: 'Category' },
	subCategories: [{ title: String, description: String }]
});

module.exports = mongoose.model('Category', categorySchema);