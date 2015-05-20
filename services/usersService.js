var AbstractUsersTypes =  require('../schemas/usersSchema');
var logger = console;
var Users = AbstractUsersTypes.User;
var Seller = AbstractUsersTypes.Seller;
var Buyer = AbstractUsersTypes.Buyer;

var usersService = {
	Sellers : {},
	Buyers : {},
	findAll : function(callback) {
		Users.find({},function(err, response){
				if(err) return err;
				//res.redirect('/login');
				callback(response);
			});
	},
	getUserByName : function(findUserName, callback) {
		var user = new Users({username : findUserName});
		user.findByName(function(response){
			callback(response);
		});
	},

	update: function(usertoUpdate, callback, userType){
		var user = new Users(usertoUpdate);
		user.update(function(response){
			callback(response);
		});
	}
};

//SELLERS
usersService.Sellers = {

	create: function (sellerData, callback) {
		var seller = new Seller(sellerData);
		seller.createUser(sellerData, function(response){
			//res.redirect('/login');
			callback(response);
		}, 'Seller');
	},
	findAll: function (callback) {
		Seller.find({},
			function (err, response) {
				if(err) {
					return err;
				}
				//res.redirect('/login');
				callback(response);
			});
	}
};

//BUYERS
usersService.Buyers = {

	create: function(buyerData, callback) {
		var buyer = new Buyer(buyerData);
			buyer.createUser(buyerData, function(response) {
				//res.redirect('/login');
				callback(200);
			}, 'Buyer');
	}, 
	findAll: function(callback) {
		Buyer.find({}, function(err, response){
				if(err) {
					return err;
				}
				//res.redirect('/login');
				callback(response);
			});
	},
	likeItem: function(usertoUpdate, callback) {
		Buyer.findByIdAndUpdate(usertoUpdate._id,
		{ $set: { 'user.likes.items': usertoUpdate.likes.items }},
		function(err, response) {
			if (err) {
				return err;
			}
			console.log(response);
			callback(response.status);
		});
	},
	likeUser: function(usertoUpdate, callback) {
		Buyer.findByIdAndUpdate(usertoUpdate._id,
			{ $set: { 'user.likes.users': usertoUpdate.likes.users }},
			function (err, response) {
				if (err) {
					logger.error(err);
					return err;
				}
				callback(response.status);
			});
	}
};

module.exports = usersService;