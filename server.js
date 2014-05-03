/**
 * Module dependencies.
 */
var express = require('express'),
	app = express(),
	http = require('http'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('session'),
	redisStore = require('connect-redis')(express),
	user = require('./Routes/user'),
	api = require('./Routes/api'),
	redis = require('redis'),
	logic = require('./Model/logic');

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

app.get('/', user.home);
app.get('/account', user.account);
app.post('/user-snippet', user.snippet);
app.post('/newpost', user.newpost);
app.post('/login', user.login);
app.post('/signup', user.signup);
app.get('/api/getposts', api.getposts);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));

    //rebuild trends AFTER response if they are an hour or more stale
	if(Date.now() - lastTrendRebuild >= 60 * 60 * 1000) {
//		Logic.buildTrends(rclient, skills);
		lastTrendRebuild = Date.now();
	}
});
