var Logic = require('../Model/logic');

module.exports = function(db){
	return {
		home : function(req, res) {
			posts = Logic.relevantPosts(req.session.user, db.getPosts());
			res.render('index', { user: req.session.user, posts: posts });
		},
		account : function(req, res) {
			if(req.session.user) {
				res.render('account', {user: req.session.user});
			} else {
				res.redirect('/');
			}
		},
		snippet : function(req, res) {
		},
		getposts : function(req, res) {
		},
		newpost : function(req, res) {
			db.addPost({bounty:req.body.bounty, task:req.body.task, title:req.body.title, skills:req.body.bounty.skills.split(',')}, req.session.user, function(err, post) {
				if(!err) {
					res.redirect('/');
				} else {
					res.send('Error posting.');
				}
			});
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
					req.logIn(user, function(err) {
						if (err) { return next(err); }
						req.session.user = user;
						console.log(user.username + " login successful");
					});					
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