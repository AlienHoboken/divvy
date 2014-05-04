exports.localPosts = function(user, posts) {
	posts = posts || [];
	var localPosts = [];
	for(var i = 0; i < posts.length; i++) {
		if(posts[i].location.city.toUpperCase() == user.location.city.toUpperCase() ) { //post in the user's city + state
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
	if(!user.interest)
		return posts;
	for(var i = 0; i < posts.length; i++) {
		var interest_count = 0;
		for(var j = 0; j < posts[i].skills.length; j++) {
			if(user.interest.indexOf(posts[i].skills[j]) > -1) {
				interest_count++;
			}
		}
		posts[i].interest_count = interest_count;
	}
	posts.sort(function(a, b) {return b.interest_count - a.interest_count;});
	return posts;
};

exports.postTrendiness = function(post) {
	var skills = [{name: "Automotive",trend_factor: 4}, {name: "Music", trend_factor: 7},
                {name: "Technology", trend_factor: 5}, {name: "Design", trend_factor: 4},
                {name: "Public Speaking", trend_factor: 2}, {name: "Weaponship", trend_factor: 7},
                {name: "Carpentry", trend_factor: 0}, {name: "Fashion", trend_factor: 3},
                {name: "Dancing", trend_factor: 2}, {name: "Drinking", trend_factor: 1}];
	var skillValues = [];
	for(var i = 0; i < post.skills.length; i++) {
		for(var j = 0; j < skills.length; j++) {
			if(skills[j].name == post.skills[i]) {
				skillValues.push(skills[j].trend_factor);
			}
		}
//		skillValues.push(post.skills[i].trend_factor);
	}
	postTrendiness = Math.max.apply(null, skillValues);
	return(postTrendiness);
};

exports.localTrendingPosts = function(user, posts) {
	posts = localPosts(user, posts);
	for(var i = 0; i < posts.length; j++) {
		posts[i].trend_factor = postTrendiness(posts[i]);
	}
	posts = posts.sort(function(a, b) {return b.trend_factor - a.trend_factor;});
	return posts;
};

exports.globalTrendingPosts = function(posts) {
	for(var i = 0; i < posts.length; i++) {
		posts[i].trend_factor = this.postTrendiness(posts[i]);
	}
	posts = posts.sort(function(a, b) {return b.trend_factor - a.trend_factor;});
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
		total += (typeof mon[skills[i]] !== 'undefined') ? mon[skills[i]] : 0;
		total += (typeof tue[skills[i]] !== 'undefined') ? tue[skills[i]] : 0;
		total += (typeof wed[skills[i]] !== 'undefined') ? wed[skills[i]] : 0;
		total += (typeof thu[skills[i]] !== 'undefined') ? thu[skills[i]] : 0;
		total += (typeof fri[skills[i]] !== 'undefined') ? fri[skills[i]] : 0;
		total += (typeof sat[skills[i]] !== 'undefined') ? sat[skills[i]] : 0;
		total += (typeof sun[skills[i]] !== 'undefined') ? sun[skills[i]] : 0;
		skills[i].trend_factor = total / 7.0;
	}
	return skills;
};
return exports;
