var Logic = require('../Model/logic');

module.exports = function(db){
	return {
		home : function(req, res) {
			res.render('index', { user: req.user });
		},
		account : function(req, res) {
			res.render('account');
		},
		snippet : function(req, res) {
		},
		getposts : function(req, res) {
		},
		newpost : function(req, res) {
			db.addPost({bounty:req.body.bounty, task:req.body.task, title:req.body.title, skills:req.body.bounty.skills.split(',')}, user, function(err, post) {
				if(!err) {
					res.redirect('/');
				} else {
					res.send('Error posting.');
				}
			});
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