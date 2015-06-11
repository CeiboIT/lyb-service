var Store = require('../schemas/storeSchema');
var usersService = require('../services/usersService');
var populationOptions = require('../configs/general').populationOptions;
var logger = require('../configs/log');
var storeService = {};

var validateStore = function (ownerData) {
	try {
		return usersService.isUnique(ownerData.username);
	} catch (error) {
		logger.log('error', 'Error validating store', error);
	}
};

storeService.create = function(storeData) {
	var ownerData;
	if (storeData.owner) {
		// remove owner information because User need to be created apart 
		ownerData = storeData.owner; 
		delete storeData.owner;
	}
	var store = new Store(storeData);

	return validateStore(ownerData)
		.then(function () {
			return store.save();
		}, function (error) {
			logger.log('error', 'Error validating store', error);
			throw error;
		})
		.then(function (storeNew) {
			return usersService.Sellers.create(ownerData)
				.then(function (seller) {
					seller.store = storeNew._id;
					return seller.save();
				}, function (error) {
					logger.log('error', 'Error creating a seller', error);
					throw error;
				})
				.then(function () {
					return store;
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

storeService.getStoreById = function(storeId) {
	var query = Store.findOne({'_id' : storeId});
	query.populate(populationOptions.owner);
	query.populate(populationOptions.categories);
	return query.exec();
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