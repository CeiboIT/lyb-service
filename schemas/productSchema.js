var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var productSchema = new Schema({
	price : String,
	name: String,
	description : String,
	currency: String,
	categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	sells : Number,
	seller : { type: Schema.Types.ObjectId, ref: 'Seller' },
	store : { type: Schema.Types.ObjectId, ref: 'Store' },
	images : [],

});

module.exports = mongoose.model('Product', productSchema);