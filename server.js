var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	path = require('path'),
	errorhandler = require('errorhandler'),
	router = express.Router(),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
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
app.set('port', 3000);
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
app.get('/api/getposts', api.getposts);

app.get('/user', user.snippet);
app.get('/listing',posting.post);

app.post('/update', user.update);

app.post('/newpost', user.newpost);
app.post('/login', auth.authenticate, user.login);
app.post('/logout', user.logout);
app.post('/signup', user.signup);

io.sockets.on('connection', function(socket) {
	io.on('newpost', function(newPost){
		console.log("New post: " + newPost);
		db.addPost({bounty:newPost.bounty, task:newPost.task, title:newPost.title, skills:newPost.skills.split(',')}, {username: newPost.username, city: newPost.city, state: newPost.state, zip: newPost.zip}, function(err, post) {
			if(!err) {
				socket.broadcast.emit('postmade', post);
			} else {
				socket.emit('posterror', err);
			}
		});		
	});
});

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));

    //rebuild trends AFTER response if they are an hour or more stale
	if(Date.now() - lastTrendRebuild >= 60 * 60 * 1000) {
//		Logic.buildTrends(rclient, skills);
		lastTrendRebuild = Date.now();
	}
});
