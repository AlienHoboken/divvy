module.exports = function (db){
	return {
		account: function (req, res){
			new_content( req, res, function (data){
				// FIXME: build appropriate response
				res.render('posts', { theBody: data, user: req.user, activePage: 'buzzfeed' });
			});
		},
		home: function (req, res){
			new_content( req, res, function (data){
				// res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
				res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
			});
		},
		snippet: function (req, res){
			new_content( req, res, function (data){
				// res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
				res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
			});
		},
		trending: function (req, res){
			new_content( req, res, function (data){
				// res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
				res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
			});
		},
		local: function (req, res){
			new_content( req, res, function (data){
				// res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
				res.render('posts', { theBody: data, user: req.user, activePage: 'newfeed' });
			});
		}
	};
};
