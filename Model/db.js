var mongoose = require('mongoose'),
	db = mongoose.connection;

// Connect to Mongo
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/divvy';
mongoose.connect(uristring, function (err, res) {
	if (err) console.log ('ERROR connecting to: ' + uristring + '. ' + err);
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("connected to db");
});

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	points: Number,
	skills: [String],
	interest: [String],
	location: {
		city: String,
		state: String,
		zip: String
	}
});

var postSchema = mongoose.Schema({
	data: Date,
	bounty: Number,
	title: String,
	task: String,
	poster: String,
	skills: [String],
	location: {
		city: String,
		state: String,
		zip: String
	}

});

var skillSchema = mongoose.Schema({
	name: String,
	trend_factor: Number
});

userSchema.methods.getCollectionIDs = function(name){
	var user = this;
};

userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
};

User = mongoose.model('User', userSchema);

exports.saveUser = function(body, callback){
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
};
exports.addUser = function(userData, callback){
	User.findOne({username: userData.username}, function(err, user) {

		user.save(function(err){
			if(err){
				console.log(err);
				return callback(err);
			}
			callback(null, user);
		});
	});
};

exports.addPost = function(body, callback){

};

exports.addPost = function(body, callback){

};

exports.addPost = function(body, callback){

};

exports.addPost = function(body, callback){

};