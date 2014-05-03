exports.account = function (req, res){

};

exports.home = function (req, res){

};

exports.snippet = function (req, res){

};

exports.trending = function (req, res){

};

exports.local = function (req, res){

};

exports.login = function (req, res){

};

exports.signup = function (req, res){

};

exports.newpost = function(req, res) {
	//get parameters from post

    //send them back to home
	res.redirect('/');
    response.end();

    //update counts for skills
};

exports.signup = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var email = req.param('email');
	var name = req.param('name');
};

exports.login = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
};
