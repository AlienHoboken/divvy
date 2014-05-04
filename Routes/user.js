var Logic = require('../Model/logic');

module.exports = function(db){
	return { 
		home : function(req, res) {
			res.render('index');
		},
		account : function(req, res) {
			res.render('account');
		},
		snippet : function(req, res) {
		},
		getposts : function(req, res) {
		},
		newpost : function(req, res) {
		},
		signup : function(req, res) {
			var uname = req.body.username;
			var passwd = req.body.password;
			var em = req.body.email;
			db.addUser({username: uname, email: em, password: passwd}, function(err, user){
				if(err == null || typeof err == undefined ) {
					//do something with user variable
					res.redirect('/account');
				} else {
					res.send('Error registering.');
				}
			});
		// add new user
		// log new user in
		// return new content
		},
		login : function(req, res) {
			var username = req.body.user.username;
			var password = req.body.user.password;
		// login return json of new content
		console.log( Logic.relevantPosts(req.body.user, db.allPosts() ) );
		}
	};
};