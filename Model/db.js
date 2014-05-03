module.exports = function(){
		SALT_WORK_FACTOR = 10,
		mongoose = require('mongoose');

	// Connect to Mongo
	/*
		If you start getting Mongo errors try wiping your Database:
		mongo nemo --eval "db.dropDatabase()"
	*/
	var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nemo';
	mongoose.connect(uristring, function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + uristring);
		}
	});

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		console.log("connected to db");
	});

	// FIXME: Set up User Schema this should be taken out and put into a User class at some point
	var apiSchema = mongoose.Schema({
		name: {type: String}, //unique true
		access_token: {type: String},
		refresh_token: {type: String},
		endpoints: [String]
	});

	var apiGroupSchema = mongoose.Schema({
		name: { type: String, required: true },
		apiIDs: [{ type: String }]
	});

	var userSchema = mongoose.Schema({
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		apis: [apiSchema],
		collections: [apiGroupSchema]
	});

	userSchema.methods.getCollectionIDs = function(name){
		//return array of _id's
		var user = this;

		for( var i = 0; i < user.collections.length; i++ ){
			if(user.collections[i].name === name){
				return user.collections[i].apiIDs;
			}
		}
		return -1;
	};

	userSchema.methods.getApiById = function(id){
		//return api objects
		var user = this;
		for( var i = 0; i < user.apis.length; i++ ){
			if(user.apis[i]._id == id){
				return user.apis[i];
			}
		}
		return -1;
	};

	userSchema.pre('save', function(next) {
		var user = this;

		if(!user.isModified('password')) return next();

	});

	userSchema.methods.comparePassword = function(candidatePassword, cb) {
	};

	User = mongoose.model('User', userSchema);

	return {
		saveUser: function(body, callback){
			var newUser = new User({
				username: body.username,
				password: body.password
			});

			newUser.save(function(err, newUser){
				if(err) {
					console.log(err);
					return callback(err);
				}
				console.log("new user: " + newUser);
				callback(null, newUser);
			});
		},
		userCrud: function (operation, structure, userData, apiData, callback){
			User.findOne({username: userData.username}, function(err, user) {
				if(structure === 'api'){
					crud_api(operation, user, apiData, callback);
				} else if(structure === 'collection') {
					crud_api_collection(operation, user, apiData, callback);
				} else {
					console.log('Not a crud operation');
					// crud_api_group(operation, user, apiData, callback);
				}

				user.save(function(err){
					if(err){
						console.log(err);
						return callback(err);
					}
					console.log("User Succeeded in adding " + apiData.name);
					callback(null, user);
				});
			});
		}
	};
}();

function crud_api(operation, user, apiData, callback){
	switch(operation) {
		case 'add':
			user.apis.push(apiData);
			break;
		case 'remove':
			break;
		default:
			var errMsg = 'invalid api operation attempted';
			return callback(errMsg);
	}
}

function crud_api_collection(operation, user, collectionData, callback){
	switch(operation) {
		case 'add':
			user.collections.push(collectionData);
			break;
		case 'remove':
			break;
		default:
			var errMsg = 'invalid group operation attempted';
			return callback(errMsg);
	}
}

// function crud_api_group(operation, user, apiData, callback){
// 	var groupIndex = find_group(user, apiData.groupName);
// 	switch(operation) {
// 		case 'add':
// 			if( groupIndex === -1){
// 				user.apiGroups.push({
// 					name: apiData.groupName,
// 					apis: apis
// 				});
// 			} else {
// 				user.apiGroups[groupIndex].name = apiData.groupName;
// 				// FIXME: update apis after updating groupname
// 			}
// 			break;
// 		case 'remove':
// 			if( groupIndex !== -1)
// 				user.apiGroups[groupIndex].remove();
// 			break;
// 		default:
// 			var errMsg = 'invalid group operation attempted';
// 			return callback(errMsg);
// 	}
// }

// function find_group(user, groupName){
// 	var numApis = user.apis.length;
// 	for(var i = 0; i < numApis; i++){
// 		if( user.apis[i].name === groupName ){
// 			return i;
// 		}
// 	}
// 	return -1;
// }

// function find_api(user, apiName, groupIndex){
// 	console.log("groupIndex: "+groupIndex);
// 	var numApis = user.apiGroups[groupIndex].apis.length;
// 	for(var i = 0; i < numApis; i++){
// 		var Api = user.apiGroups[groupIndex].apis[i];
// 		if(Api.name === apiName) {
// 			return i;
// 		}
// 	}
// 	return -1;
// }
