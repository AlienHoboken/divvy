exports.account = function (req, res){

};

exports.home = function (req, res){

};

exports.snippet = function (req, res){

};

exports.trending = function (req, res){
	res.send({});
};

exports.local = function (req, res){
	res.send({});
};

exports.newpost = function(req, res) {
	//get parameters from post

    //send them back to home
	res.redirect('/');
    response.end();
}

exports.login = function(req, res) {
	
}