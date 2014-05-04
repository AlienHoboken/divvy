exports.localPosts = function(user, posts) {
	posts = posts || [];
	var localPosts = [];
	for(var i = 0; i < posts.length; i++) {
		if(posts[i].location.city == user.location.city && posts[i].location.state == user.location.state ) { //post in the user's city + state
			localPosts.push(posts[i]);
		}
	}
	return localPosts;
};

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
	posts.sort(function(a, b) {return b.interest_count - a.interest_count;});
	return posts;
};

var postTrendiness = function(post) {
	var skillValues = [];
	for(var i = 0; i < post.skills.length; i++) {
		skillValues.push(post.skills[i].trendiness);
		postTrendiness = Math.max.apply(null, skillValues);
	}
};

exports.localTrendingPosts = function(user, posts) {
	posts = localPosts(user, posts);
	for(var i = 0; i < posts.length; j++) {
		posts[i].trendiness = postTrendiness(posts[i]);
	}
	posts = posts.sort(function(a, b) {return b.trendiness - a.trendiness;});
	return posts;
};

exports.globalTrendingPosts = function(posts) {
	for(var i = 0; i < posts.length; j++) {
		posts[i].trendiness = postTrendiness(posts[i]);
	}
	posts = posts.sort(function(a, b) {return b.trendiness - a.trendiness;});
	return posts;
};

exports.buildTrends = function(client, skills) {
	var mon = client.HGETALL("monday");
	var tue = client.HGETALL("tuesday");
	var wed = client.HGETALL("wednesday");
	var thu = client.HGETALL("thursday");
	var fri = client.HGETALL("friday");
	var sat = client.HGETALL("saturday");
	var sun = client.HGETALL("sunday");

	for(var i = 0; i < skills.length; i++) {
		var total = 0;
		total += (typeof mon[skills[i].name] !== 'undefined') ? mon[skills[i].name] : 0;
		total += (typeof tue[skills[i].name] !== 'undefined') ? tue[skills[i].name] : 0;
		total += (typeof wed[skills[i].name] !== 'undefined') ? wed[skills[i].name] : 0;
		total += (typeof thu[skills[i].name] !== 'undefined') ? thu[skills[i].name] : 0;
		total += (typeof fri[skills[i].name] !== 'undefined') ? fri[skills[i].name] : 0;
		total += (typeof sat[skills[i].name] !== 'undefined') ? sat[skills[i].name] : 0;
		total += (typeof sun[skills[i].name] !== 'undefined') ? sun[skills[i].name] : 0;
		skills[i].trendiness = total / 7.0;
	}
	return skills;
};
return exports;