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

exports.newpost = function(req, res) {
	//get parameters from post1

    //send them back to home
	res.redirect('/');
    response.end();

    //update counts for skills
};

exports.signup = function(db) {
	return function(req, res) {
	var uname = req.body.username;
	var passwd = req.body.password;
	var em = req.body.email;
	db.addUser({username: uname, email: em, password: passwd});/*, function(err, user){
		if(err == null) {
			//do something with user variable
			res.redirect('/account');
		} else {
			res.redirect('/');
		}
	});*/
// add new user
// log new user in
// return new content
	};
};

exports.login = function(req, res, db) {
	var username = req.body.user.username;
	var password = req.body.user.password;

// login return json of new content
};