var mongoose = require('mongoose');
var configuration = {
	URI: process.env.MONGOLAB_URI || 'mongodb://localhost',
	dbName: '/young-luxury-db'
};

mongoose.set('debug', true);

var db = {
 	connect : function() {
 		mongoose.connect(configuration.URI + configuration.dbName);
 		mongoose.connection.on('open', function() {
 			console.log('Database has been opened');
 		});
 	},
 	disconnect : function() {
 		mongoose.disconnect();
 	}
};

//Configure and expose the database
module.exports = db;