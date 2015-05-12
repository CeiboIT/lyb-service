var Store = require('../schemas/storeSchema');
var populationOptions = require('../configs/general').populationOptions;
var logger = console;
var storeService = {};

storeService.create = function(storeDetails, callback) {
	var store = new Store(storeDetails);

	store.save(function(err){
		if(err) return err;
		callback(200);
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

storeService.update= function(store, callback) {

	// for (var i = store.categories.length - 1; i >= 0; i--) {
	// 	store.categories[i] = store.categories[i]._id;
	// }

	// store.owner = store.owner._id;

	Store.findByIdAndUpdate(store._id,
		{ $set: { name: store.name }},
		function(err, store){
			if(err) {
				logger.error('storeService.update', err);
				callback({err : err});	
			}
			callback(store);
		});
};

module.exports = storeService;