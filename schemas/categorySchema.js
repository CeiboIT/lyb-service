var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var categorySchema = new Schema({
	title : String,
	properties : {},
	subCategories : [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model("Category", categorySchema);