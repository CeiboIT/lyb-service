var AbstractUsersTypes =  require('../schemas/usersSchema');

var Users = AbstractUsersTypes.User
//get an instance, we will do Read Only Operations here:
//


var statsService = {};

statsService.getUsersStats = function(callback) {
	var user = new Users();
		user.countUsers(function(sellersCount){
			user.countUsers(function(buyersCount){
				callback([
					{ title : 'Users', number: sellersCount + buyersCount},
					{ title : 'Sellers', number: sellersCount},
					{ title : 'Buyers', number: buyersCount},
				])
				} ,'Buyer')
		},'Seller')
}

module.exports = statsService;