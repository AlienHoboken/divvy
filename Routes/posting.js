var Logic = require('../Model/logic');

module.exports = function(db) {
	return {
		post : function(req,res) {
			// var id = req.query.id;
			// db.post.findOne({_id: id}, function(err, doc) {
   //      if (doc) {
   //        res.render('listing', {post: doc});
   //      }
   //      else {
   //        res.redirect('/');
   //      }
		 //  }
   //  );
            res.render('listing');
	}
}
};