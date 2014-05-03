exports.localPosts = function(user, posts) {
	var localPosts = [];
	for(var i = 0; i < posts.length; i++) {
		if(posts[i].location.city == user.location.city && posts[i].location.state == user.location.state ) { //post in the user's city + state
			localPosts.push(posts[i]);
		}
	}
	return localPosts;
}

/*
  Returns posts related to a user's interest,
  most relevant at the top
*/
exports.relevantPosts = function(user, posts) {
	posts = this.localPosts(user, posts);
	for(var i = 0; i < posts.length; i++) {
		var interest_count = 0;
		for(var j = 0; j < posts[i].skills.length; j++) {
			if(user.interests.indexOf(posts[i].skills[j]) > -1) {
				interest_count++;
			}
		}
		posts[i].interest_count = interest_count;
	}
	posts.sort(function(a, b) {return b.interest_count - a.interest_count});
	return posts;
}

exports.localTrendingPosts = function(user, posts) {
	//posts = this.localPosts(user. posts);

}

exports.globalTrendingPosts = function(posts) {

}

return exports;