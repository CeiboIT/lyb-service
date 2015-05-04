var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var storeSchema = new Schema({
	name : String,
	location: String,
	products : [],
	categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	web: String,
	email: String,
	phone: String,
	photo : {},
	owner : { type: Schema.Types.ObjectId, ref: 'Seller' }
});

module.exports = mongoose.model("Store", storeSchema);