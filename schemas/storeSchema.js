var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var soft_delete = require('mongoose-softdelete');

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

storeSchema.plugin(soft_delete);

module.exports = mongoose.model('Store', storeSchema);