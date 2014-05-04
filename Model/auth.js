module.exports = function(passport, LocalStrategy) {
	//Setting up passport module
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false, { message: 'Unknown user ' + username, err: 'unknown user' }); }
			user.comparePassword(password, function(err, isMatch) {
				if (err) return done(err);
				if(isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
			console.log((user.username + " has logged in.").green);
		});
	}));

	return {
		ensureAuthenticated: function(req, res, next) {
				if (req.isAuthenticated()) { return next(); }
				res.send('{err: "403", msg: "Permission Denied"}');
		},

		authenticate: function(req, res, next){
			passport.authenticate('local', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) {
					console.log('Auth: ' + info.message);
					if(req.session === undefined) {
						console.log('session is undefined');
						return res.send('{err: "session is undefined", msg: "' + info.message + '"}');
					}
					req.session.messages =  [info.message];
					return res.send('{err: "User not found", msg: "Was unable to find a user that matches that username and password"}');
				}
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					req.session.user = user;
					console.log(user.username + " login successful");
					return res.redirect('/');
				});
			})(req, res, next);
		}
	};
};