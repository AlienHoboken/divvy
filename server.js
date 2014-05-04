var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	path = require('path'),
	errorhandler = require('errorhandler'),
	router = express.Router(),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	db = require('./Model/db'),
	user = require('./Routes/user')(db),
	posting = require('./Routes/posting')(db),
	api = require('./Routes/api'),
	redis = require('redis'),
	logic = require('./Model/logic'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bodyParser = require('body-parser'),
	auth = require('./Model/auth')(passport, LocalStrategy),
	ejs = require('ejs');

//build redis + trends
var lastTrendRebuild = Date.now();
var rclient = redis.createClient();
rclient.on("error", function (err) {
  console.log("Error " + err);
});
//Logic.buildTrends(rclient, skills);

// all environments
app.set('port', 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser()); // required before session.
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: 'RedisPASS'
  }),
  secret: 'doIDareToEatAPeach'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(logger());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.use(errorhandler());


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.use(errorhandler({ dumpExceptions: true, showStack: true }));
} else {
	app.use(errorhandler());
}

app.get('/', user.home);
app.get('/account', user.account);
app.get('/user/:username', user.profile);
app.get('/me', user.me);
//app.get('/user/:username', user.account);
app.get('/api/getposts', api.getposts);
app.get('/user', user.snippet);
app.get('/listing/:id', posting.post);
app.get('/logout', user.logout);

app.post('/update', user.update);
app.post('/newpost', user.newpost);
app.post('/login', auth.authenticate, user.login);
app.post('/signup', user.signup);
app.post('/update_post',posting.update);

io.sockets.on('connection', function(socket) {
	console.log("New io client connected.");
	socket.on('newpost', function(data){
		var newPost = JSON.parse(data);
		console.log("New post: " + data);
		db.addPost({bounty:newPost.bounty, task:newPost.task, title:newPost.title, skills:newPost.skills, username: newPost.username, city: newPost.city, state: newPost.state, zip: newPost.zip}, function(err, post) {
			if(!err) {
				console.log("Broadcasting new post!");
			} else {
				console.log("Failed to add post");
				//socket.emit('posterror', err);
			}
		});
		newPost.date = Date.now();
		socket.broadcast.emit('postmade', JSON.stringify(newPost));
	});
});

var skills = [{name: "Automotive",trend_factor: 4}, {name: "Music", trend_factor: 7}, 
		{name: "Technology", trend_factor: 5}, {name: "Design", trend_factor: 4}, 
		{name: "Public Speaking", trend_factor: 2}, {name: "Weaponship", trend_factor: 7}, 
		{name: "Carpentry", trend_factor: 0}, {name: "Fashion", trend_factor: 3}, 
		{name: "Dancing", trend_factor: 2}, {name: "Drinking", trend_factor: 1}];


server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));

    //rebuild trends AFTER response if they are an hour or more stale
	if(Date.now() - lastTrendRebuild >= 60 * 60 * 1000) {
		Logic.buildTrends(rclient, skills);
		lastTrendRebuild = Date.now();
	}
});
