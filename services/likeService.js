var Like = require('../schemas/likeSchema');

var likeService = {};

likeService.likeProduct = function (product, user) {
	var newLike = new Like({ product: product._id, user: user._id });
	return newLike.save();	
};

likeService.getLikesFromUser = function (user) {
	return Like.find({user: user._id})
		.populate('product');
};

module.exports = likeService;
