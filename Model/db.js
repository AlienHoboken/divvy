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
	_id: Number,
	username: String,
	name: String,
	email: String,
	password: String,
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
	_poster: Number,
	skills: [Number],
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
Post = mongoose.model('Post', postSchema);
Skill = mongoose.model('Skill', skillSchema);

exports.usernameTaken = function(uname) {
	User.find({username: uname}, function (err, users) {
    	if (err) { console.log(err); }

        if(!users) { //no user with this name
        	return false;
		} else {
			return true;
		}
	});
};

exports.addUser = function(body, callback){
    if(!this.usernameTaken(body.username)) { //no user with this name
	var newUser = new User({
		username: body.username,
		name: body.name,
		email: body.email,
		points: body.points,
		skills: [],
		interest: [],
		location: {
			city: body.city,
			state: body.state,
			zip: body.zip
		}
	});

    
		newUser.save(function(err, newUser){
			if(err) {
				console.log(err);
//				return callback(err);
			}
			console.log("new user: " + newUser);
//			callback(null, newUser);
		});
	}
};

exports.getUser = function(uname, callback) {
	User.findOne({username: uname}, function(err, user){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		return user;
	});
}

exports.updateUser(user, skills, interests, callback) {
	var newUser = new User({
		username: body.username,
		name: body.name,
		email: body.email,
		points: body.points,
		skills: skills,
		interest: interests,
		location: {
			city: body.city,
			state: body.state,
			zip: body.zip
		}
	});

	User.findOneAndUpdate({username: user.username}, newUser, {function(err, updateUser){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("updated user: " + updateUser);
	});
}

exports.deleteUser = function(body, callback) {
	User.findOneAndRemove({username: body.username}, function(err, user){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("deleted user: " + user);
	});
};

exports.addPost = function(post, user, callback) 
	var newPost = new Post({
		data: post.data,
		bounty: post.bounty,
		title: post.title,
		task: post.task,
		_poster: user.id,
		skills: post.skills,
		location: {
			city: user.city,
			state: user.state,
			zip: user.zip
		}
	});

	newPost.save(function(err, newPost) {
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("new post: " + newPost);
//		callback(null, newPost);
	});
};

exports.getPosts = function() {
	Post.find({}, function(err, posts) {
		return users;
	});
};

exports.removePost = function(post, callback){
	Post.findByIdAndRemove(post.id, function(err, post){
		if(err) {
			console.log(err);
//			return callback(err);
		}
	});
};

exports.addSkill = function(skill, callback){
	newSkill = new Skill({
		name: skill,
		trend_factor: 0
	});

	newSkill.save(function(err, newSkill) {
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("new skill: " + newSkill);
//		callback(null, newSkill);
	});
};

exports.removeSkill = function(skill, callback){
	Skill.findOneAndRemove({name: skill.name}, function(err, oldSkill){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("removed skill: " + oldSkill);
//		callback(null, oldSkill);
	});
};

exports.updateSkill = function(skill, callback) {
	newSkill = new Skill({
		name: skill,
		trend_factor: skill.trend_factor
	});
	Skill.findOneAndUpdate({name: skill.name}, newSkill, function(err, updateSkill){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("updated skill: " + updateSkill);
//		callback(null, updateSkill);
	});
};

exports.user = User;
exports.skill = Skill;
exports.post = Post;