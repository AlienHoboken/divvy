var Logic = require('../Model/logic');

exports.home = function(req, res, db) {
	res.render('index');
};

exports.account = function(req, res, db) {
	res.render('account');
};

exports.snippet = function(req, res, db) {

};

exports.getposts = function(req, res, db) {

};

exports.newpost = function(req, res, db) {
	//get parameters from post

    //update counts for skills
};

exports.signup = function(req, res, db) {
	var uname = req.body.user.username;
	var passwd = req.body.user.password;
	var em = req.body.user.email;
	db.addUser({username: uname, email: em, password: passwd}, function(err, user){
		if(err == null) {
			//do something with user variable
			res.redirect('/account');
		} else {
				res.send('Error registering.');
		}
	});
// add new user
// log new user in
// return new content
};

exports.login = function(req, res, db) {
	var username = req.body.user.username;
	var password = req.body.user.password;

// login return json of new content
console.log( Logic.relevantPosts(req.body.user, db.allPosts() ) );
};