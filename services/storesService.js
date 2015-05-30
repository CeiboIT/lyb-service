var Store = require('../schemas/storeSchema');
var usersService = require('../services/usersService');
var mongoose = require('mongoose');
var populationOptions = require('../configs/general').populationOptions;
var logger = require('../configs/log');
var storeService = {};

storeService.create = function(storeData, callback) {
	var store = new Store(storeData);
	var createStore = function () {
		usersService.Sellers.create(storeData.owner, function(err, newSeller) {
			if(err) {
				logger.log('error', 'storeService > create ' + err);
				callback(500);
				return err;
			}
			store.owner = newSeller.id;
			store.save(function (err, newStore) {
				if(err) {
					logger.log('error', 'storeService > create ' + err);
					callback(500);
					return err;
				}
				logger.log('debug', 'Store created ' + newStore);
				callback(newStore);
			});	
	    });
	};
	usersService.getUserByName(storeData.owner.username)
		.then(function(response) {
				if (!response) {
					createStore();
				} else {
					logger.log('error', 'User already exist. One user can be owner of store');
					callback(500);
				}
			},
			function (err) {
				if (err) {
					logger.log('error', err);
					callback(500);
				}
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