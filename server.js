/**
 * Module dependencies.
 */
colors = require('colors');

var express = require('express'),
	app = express(),
	http = require('http'),
	path = require('path'),
	engine = require('ejs-locals'),
	passport = require('passport'),
	redis = require('redis'),
	RedisStore = require('connect-redis')(express);

	var db = require('./Model/db');
// 	//auth = require('./Model/auth')(passport, LocalStrategy),
	var user = require('./Routes/user')(db);
// 	// indexRoute = require('./Routes/index')(db);

// if (process.env.REDISTOGO_URL) {
// 	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
// 	var redisClient = require("redis").createClient(rtg.port, rtg.hostname);
// 	redisClient.auth(rtg.auth.split(":")[1]);
// } else {
// 	var redisClient = require("redis").createClient();
// }

// var cookieMaxAge = 90000000;
// var sessionStore = new RedisStore({
// 	client: redisClient,
// });

// all environments
app.set('port', 80);
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('app cookie secret'));
// app.use(express.session({
// 	key: 'cookieKey',
// 	store: sessionStore,
// 	secret: 'app cookie secret',
// 	cookie: { maxAge: (cookieMaxAge !== 0) ? cookieMaxAge : null }
// }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'Public')));



// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', user.home);
app.get('/acccount', user.account);

app.post('/user-snippet', user.snippet);
app.post('/trending-user', user.trending);
app.post('/trending-local', user.local);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
