var Logic = require('../Model/logic');

module.exports = function(db){
	return {
		post : function(req,res){
			var id = req.body.id;
			db.post.findOne({_id: id}, function(err, doc) { res.send(doc); });
		}
	};
};