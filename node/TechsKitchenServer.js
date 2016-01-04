var config = require('./lib/Config.js');
var user = require('./lib/User.js');
var recipe = require('./lib/Recipe.js');

var Express = require('express');
var app = Express();

app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.get('/getrecipe', function(req, res) {
		res.send(recipe.getRecipe());
});

app.get('/getrecipes', function(req, res) {
		res.send(recipe.getRecipes());
});

var server = app.listen('3000', function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
