var generalConf = {};

generalConf.populationOptions = {
	seller : {
		  path: 'seller',
		  select: 'username country email'
		},
		categories : {
			path: 'categories',
			select: 'title'
		},
		owner : {
			path: 'owner',
			select: 'username country'
		},
		store: {
			path: 'store',
		},
		subCategories: {
			path: 'subCategories'
		}
};

generalConf.bodyLimit = { limit: '16mb' }; 

module.exports = generalConf;