var AbstractUsersTypes =  require('../schemas/usersSchema');
var logger = require('../configs/log');
var Users = AbstractUsersTypes.User;
var Seller = AbstractUsersTypes.Seller;
var Buyer = AbstractUsersTypes.Buyer;
var Admin = AbstractUsersTypes.Admin;

var loadInitialUser = function () {
	// Add default admin:admin user
	usersService.getUserByName('admin')
		.then(function (response) {
			if (!response) {
				var admin = new Admin();
				admin.username = 'admin';
				admin.password = admin.generateHash('admin');
				admin.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    return admin;
				});
			}
		});
};

var usersService = {
	Sellers : {},
	Buyers : {},
	isUnique: function (username) {
		return usersService.getUserByName(username)
			.then(function(response) {
				return response;
			},
			function (err) {
				if (err) {
					logger.log('error', err);
					return err;
				}
			});
	},
	findAll : function(callback) {
		Users.find({}, function(err, response){
				if(err) {
					logger.error('usersService > findAll ', err);
					return err;
				}
				//res.redirect('/login');
				callback(response);
			});
	},
	getUserByName : function(findUserName) {
		return Users.findOne({username : findUserName})
			.exec();
		// function(err, response){
		// 	callback(err, response);
		// });
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
	create: function (sellerData) {
		var seller = new Seller(sellerData);
		return seller.createUser(sellerData, 'Seller')
			.then(function (user) {
				return user;
			}, function (error) {
				logger.log('error', error);
				throw error;
			});
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

loadInitialUser();

module.exports = usersService;