/**
 * Module dependencies.
 */
var express = require('express'),
	app = express(),
	http = require('http'),
	path = require('path'),
	user = require('./Routes/user'),
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
app.set('views', path.join(__dirname, 'Views'));
app.use(express.static(path.join(__dirname, 'Public')));

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
