/**
 * Module dependencies.
 */
var express = require('express'),
	app = express(),
	http = require('http'),
	path = require('path'),
	user = require('./Routes/user');
	redis = require('redis');

// all environments
app.set('port', 3000);
app.set('views', path.join(__dirname, 'Views'));
app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', user.home);
app.get('/acccount', user.account);

app.post('/user-snippet', user.snippet);
app.get('/trending-user', user.trending);
app.get('/trending-local', user.local);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
