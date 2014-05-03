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
	redisStore = require('connect-redis')(express);
	user = require('./Routes/user');

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
app.get('/login',user.login);
app.get('/signup',user.signup);
app.post('/user-snippet', user.snippet);
app.post('/trending-user', user.trending);
app.post('/trending-local', user.local);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
