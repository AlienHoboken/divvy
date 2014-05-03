var Post = require('./Model/post');
var User = require('./Model/user');
var Logic = require('./Model/logic');

var posts = [];
for(var i = 0; i < 5; i++) {
	posts.push(new Post());
	posts[i].title = "title" + i;
	posts[i].location.city = "Dayton";
	posts[i].location.state = "OH";
	posts[i].location.zip = "45419";
}

for(var i = 5; i < 10; i++) {
	posts.push(new Post());
	posts[i].title = "title" + i;
	posts[i].location.city = "Cinci";
	posts[i].location.state = "OH";
	posts[i].location.zip = "71232";
}

posts[0].skills = ["C++"];
posts[1].skills = ["JS", "Ruby"];
posts[2].skills = ["PHP", "Java", "Lisp"];
posts[3].skills = ["Lisp", "Ruby", "JS"];
posts[4].skills = ["PHP", "Lisp", "Java"];
posts[5].skills = ["Java", "Ruby", "C++", "Lisp", "PHP"];
posts[6].skills = ["Ruby"];
posts[7].skills = ["ASP"];
posts[8].skills = ["Haskell"];
posts[9].skills = ["PHP", "HTML"];

var user1 = new User();
user1.location.city = "Dayton";
user1.location.state = "OH";
user1.location.zip = "45419";
user1.interests = ["C++", "Java", "PHP"];

var user2 = new User();
user2.location.city = "Cinci";
user2.location.state = "OH";
user2.location.zip = "71232";
user2.interests = ["Ruby", "JS", "Lisp"];

//console.log(Logic.localPosts(user2, posts));

console.log(Logic.relevantPosts(user1, posts));