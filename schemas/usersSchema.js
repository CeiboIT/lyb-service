var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var bcrypt = require('bcrypt-nodejs')
var util = require('util');
var fashionTypes = require('../configs/referenceValues').fashionTypes;
var fs = require('fs');

function AbstractUserSchema() {           
    Schema.apply(this, arguments);          
    this.add({                              
        username : String,
    	email: String,
    	password : String,
    	profilePhoto : {},
    	country: String,
    	bio: String,
    	creationDate : { type : Date, default: Date.now() }
    });                                     
};                                          
                                            
util.inherits(AbstractUserSchema, Schema);

var userSchema = new AbstractUserSchema();

/***Commons Methods ***/

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createUser= function(userToCreate, callback, userType){

	if(userType) {
		var user = new usersType[userType](userToCreate);
		user.password = user.generateHash(user.password);

		user.save(function(err, savedUser){
			if(err) return err;
			callback(200)
		})
	}


};

userSchema.methods.findByNameOrEmail = function(identification, callback, userType) {
	var User = this.model('User');
	var query;
	var options = { $or : [{ "username": identification }, { "email": identification }] };
	if(userType) {
		query = usersType[userType].findOne(options)
	} else {
		query = User.findOne(options)
	}

	query.exec(function(err, user){
		if(err) return err;
		callback(user);
	})
} 

userSchema.methods.findByName = function(callback, userType) {
	var User = this.model('User');
	var query;
	var options = { "username": this.username };
	if(userType) {
		query = usersType[userType].findOne(options)
	} else {
		query = User.findOne(options)
	}

	query.exec(function(err, user){
		if(err) return err;
		callback(user);
	})
}

userSchema.methods.update = function(callback, userType) {
	var User = this.model('User');
	var query;
	var userToUpdate = this._doc;
	if(userType) {
		usersType[userType].findByIdAndUpdate(userToUpdate._id, userToUpdate)
			.exec(function(err, user){
				if(err) callback({err : err});
				callback(user)
			});
	} else {
		User.findByIdAndUpdate(userToUpdate._id, userToUpdate)
			.exec(function(err, user){
				if(err) callback({err : err});
				callback(user)
			});
	}
}

userSchema.methods.countUsers = function(callback, userType) {
	var User = this.model('User');

	if(userType) {
		usersType[userType]
		.find()
		.count(function(err, count){
			callback(count)
		});
	} else {
		User
		.find()
		.count(function(err, count){
			callback(count)
		});
	}
}



/***** ****/ 

//Reference the model of a generic user in a variable
var User =  mongoose.model('User', userSchema)

//Definition of Seller
var sellerSchema = new AbstractUserSchema ({
	store : { type: Schema.Types.ObjectId, ref: 'Store' },
	website: String

});
// Definition of Buyer

var buyerSchema = new AbstractUserSchema ({
	cart : [],
	mainlylookingFor : {type: String, enum : fashionTypes },
	//Followers must be populated with users
	followers: [],
	//Following must be populated with users
	following : [],
	//Following must be populated with products
	likes : {
		users : [],
		items : []
	},
	ordersHistory : [],
	lastViewedItems : []
})

//Put it all together for prepare for export;

var adminSchema = new AbstractUserSchema();


var usersType = {
	User : User,
	Seller : User.discriminator('Seller', sellerSchema),
	Buyer : User.discriminator('Buyer', buyerSchema),
	Admin : User.discriminator('Admin', adminSchema)
};

//Export it
module.exports = usersType