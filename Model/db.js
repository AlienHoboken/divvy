var mongoose = require('mongoose'),
	db = mongoose.connection;

var credential = require('credential');

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
	username: String,
	name: String,
	email: String,
	passwordHash: String,
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
	date: Date,
	bounty: Number,
	title: String,
	task: String,
	_poster: String,
	link: String,
	ifCollected: Boolean,
	interested: [{
		id: Number,
		username: String
	}],
	skills: [String],
	location: {
		city: String,
		state: String,
		zip: String
	}

}, { collection : 'posts' });

var skillSchema = mongoose.Schema({
	name: String,
	trend_factor: Number
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {

	credential.verify(this.passwordHash, candidatePassword, function(err, isValid) {
			var msg;
			if (err) { throw err; }
			if(isValid) {
				console.log('Passwords match!');
				return cb(null, true);
			} else {
				console.log('Wrong password.');
				return cb("Wrong password", false);
			}
	});
};

User = mongoose.model('User', userSchema);
Post = mongoose.model('Post', postSchema);
Skill = mongoose.model('Skill', skillSchema);


exports.usernameTaken = function(uname) {
	User.find({username: uname}, function (err, users) {
    	if (err) { console.log(err) ;}

        if(!users) { //no user with this name
        	return false;
		} else {
			return true;
		}
	});
};

exports.addUser = function(body, callback) {
	credential.hash(body.password, function(err, hash) {
		if(err) { console.log(err); return; }
	    if(!exports.usernameTaken(body.username)) { //no user with this name
			var newUser = new User({
			username: body.username,
			name: "",
			email: body.email,
			passwordHash: hash,
			points: 0,
			skills: [],
			interest: [],
			location: {
				city: "",
				state: "",
				zip: ""
			}
			});

			newUser.save(function(err, newUser){
				if(err) {
					console.log(err);
					return callback(err);
				}
				console.log("new user: " + newUser);
				callback(null, newUser);
			});
		}
	});
};

exports.getUser = function(uname, callback) {
	User.findOne({username: uname}, function(err, user){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		return callback(null, user);
	});
};

exports.updateUser = function(user, skills, interests, callback) {
	console.log(skills);
	var newUser = {
		name: user.name,
		email: user.email,
		skills: (skills) ? skills : [],
		interest: (interests) ? interests : [],
		location: {
			city: user.city,
			state: user.state,
			zip: user.zip
		}
	};

	User.findOneAndUpdate({username: user.username}, newUser, function(err, updateUser){
		if(err) {
			console.log("err: " + err);
//			return callback(err);
		}
		console.log("updated user: " + updateUser);
		return callback(null, updateUser);
	});
};

exports.deleteUser = function(body, callback) {
	User.findOneAndRemove({username: body.username}, function(err, user){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("deleted user: " + user);
	});
};

exports.addPost = function(post, callback) {
	var newPost = new Post({
		date: Date.now(),
		bounty: post.bounty,
		title: post.title,
		task: post.task,
		_poster: user.username,
		link: post.link,
		ifCollected: post.ifCollected,
		interested: [],
		skills: post.skills,
		location: {
			city: post.city,
			state: post.state,
			zip: post.zip
		}
	});

	newPost.save(function(err, addedPost) {
		if(err) {
			console.log(err);
			return callback(err);
		}
		console.log("new post: " + addedPost);
		callback(null, addedPost);
	});
};

exports.updatePost = function(post, user, callback) {
	var newPost = {
		date: Date.now(),
		bounty: post.bounty,
		title: post.title,
		task: post.task,
		_poster: user.username,
		link: post.link,
		ifCollected: post.ifCollected,
		interested: [],
		skills: post.skills,
		location: {
			city: user.city,
			state: user.state,
			zip: user.zip
		}
	};

	User.findOneAndUpdate({_id: post._id}, newPost, function(err, updatedPost){
		if(err) {
			console.log(err);
//			return callback(err);
		}
		console.log("updated user: " + updatePost);
		if(callback) return callback();
	});
};

exports.getPosts = function(callback) {
Post.find( function(err, posts) {
	if (!err){ 
		return callback(null, posts);
	} else {
		console.log(err);
		return callback(err);
	}
	});
};

exports.getPostsByPoster = function(user, callback) {
	var username = user.username;
	Post.find( {_poster : username}, function(err, posts) {
		if (!err){ 
			return callback(null, posts);
		} else {
			console.log(err);
			return callback(err);
		}
	});
};


exports.removePost = function(post, callback){
	Post.findByIdAndRemove(post._id, function(err, post){
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
	newSkill = {
		name: skill,
		trend_factor: skill.trend_factor
	};
	Skill.findOneAndUpdate({name: skill.name}, newSkill, function(err, updateSkill){
		if(err) {
			console.log(err);
			return callback(err);
		}
		console.log("updated skill: " + updateSkill);
		callback(null, updateSkill);
	});
};

exports.user = User;
exports.skill = Skill;
exports.post = Post;
