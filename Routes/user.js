var Logic = require('../Model/logic');

module.exports = function(db){
	return {
		home : function(req, res) {
			res.render('index', { user: req.user });
		},
		account : function(req, res) {
			res.render('account',{ user: req.user });
		},
		snippet : function(req, res) {
		},
		getposts : function(req, res) {
		},
		newpost : function(req, res) {
		},
		update : function(req, res){
			console.log(req.user);
			console.log(req.body);
			// req.user.city = req.body.city;
			// req.user.state = req.body.state;
			// req.user.zip = req.body.zip;
			// db.updateUser(req.user, req.body.skills, req.body.interests, function(req,res){
			// 	res.redirect('/');
			// });
		},
		signup : function(req, res) {
			var uname = req.body.username;
			var passwd = req.body.password;
			var em = req.body.email;
			db.addUser({username: uname, email: em, password: passwd}, function(err, user){
				if(!err ) {
					//do something with user variable
					res.redirect('/account');
				} else {
					res.send('Error registering.');
				}
			});
		},
		login : function(req, res) {
			var username = req.body.user.username;
			var password = req.body.user.password;
			// login return json of new content
			// console.log( Logic.relevantPosts(req.body.user, db.allPosts() ) );
		},
		logout : function(req,res){
			req.logout();
			res.redirect('/');
		}
	};
};