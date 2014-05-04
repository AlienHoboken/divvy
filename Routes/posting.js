var Logic = require('../Model/logic');

module.exports = function(db) {
	return {
	post : function(req,res) {
		var id = req.params.id;
console.log("Getting " + id);
		db.post.findOne({_id: id}, function(err, doc) {
        		if (doc) {
        			  res.render('listing', {post: doc});
		        } else {
        			  res.redirect('/');
        	}
      		});
    },
    update: function(req,res){
      if(req.session.user){
        var user = req.session.user,
          post = req.body.post;
        db.updatePost(post,user,function(err,updated){
          res.send(updated);
        });
      }
    }

  };
};
