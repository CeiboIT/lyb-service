var mongoose = require('mongoose');
var configuration = {
	URI: process.env.MONGOLAB_URI || 'mongodb://localhost',
	dbName: '/young-luxury-db'
}

var options =  {
	//add options if were required
};

var db = {
 	connect : function() {
 		mongoose.connect(configuration.URI + configuration.dbName);
 		mongoose.connection.on('open', function(event){
 			console.log('Database has been opened');
 		})
 	},

 	disconnect : function() {
 		mongoose.disconnect();
 	}
}


//Configure and expose the database

module.exports = db;