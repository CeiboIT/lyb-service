var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var likeSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'Buyer' },
	creationDate: { type : Date, default: Date.now() },
	product: { type: Schema.Types.ObjectId, ref: 'Product' }
});

likeSchema.index({ user: 1, product: 1}, { unique: true });
module.exports = mongoose.model('Like', likeSchema);