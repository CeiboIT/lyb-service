var Store = require('../schemas/storeSchema');
var usersService = require('../services/usersService');
var populationOptions = require('../configs/general').populationOptions;
var logger = require('../configs/log');
var storeService = {};

storeService.create = function(storeData, callback) {
	var store = new Store(storeData);
	
	usersService.getUserByName(storeData.owner.username, function (err, response) {
		if (response) {
			logger.log('error', 'User already exist. One user can be owner of store');
			return (500);
		}
		usersService.Sellers.create(storeData.owner, function(err, newSeller) {
			usersService.getUserByName(newSeller.username, function (err, response){
				// store.owner = 
				store.save(function (err, newStore) {
					if(err) {
						logger.log('error', 'storeService > create ' + err);
						return err;
					}
					logger.log('debug', 'Store created ' + newStore);
					callback(200);
				});	
				
			});
		});
	});
};

storeService.findAll = function(callback) {

	Store.find()
	.populate(populationOptions.owner)
	.populate(populationOptions.categories)
	.exec(function(err, response){
		if(err) return err;
		callback(response);
	});

};

storeService.getStoreById = function(storeId, callback) {

	var query = Store.findOne({'_id' : storeId});
	query.populate(populationOptions.owner);
	query.populate(populationOptions.categories);
	query.exec(function(err, response){
		if(err) return err;
		callback(response);
	});

};

storeService.delete = function(storeId, callback) {
	Store.findOne({'_id' : storeId}).
	remove(function (err) {
		if (err) {
			logger.error('store > delete > ' , err);
		}
		callback(200);
	});
};
		
storeService.update= function(store, callback) {

	var storeId = store._id;
	delete store._id;
	Store.findByIdAndUpdate(storeId,
		store,
		function(err, store){
			if(err) {
				logger.error('storeService.update', err);
				callback({err : err});	
			}
			callback(store);
		});
};

module.exports = storeService;