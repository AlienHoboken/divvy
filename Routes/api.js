exports.getposts = function (req, res){
	var local = req.param('local');
	var relevant = req.param('relevant');
	var keywords = req.param('keywords').split(',');
};