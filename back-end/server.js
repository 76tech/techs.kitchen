// server.js
// main entry point for tkapi

var restify = require('restify');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

var Recipe = require('./models/Recipe');
var Config = require('./lib/Config');
var Auth = require('./lib/Auth');

var server = restify.createServer();
var port = process.env.PORT || 8080;

// Server setup/config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));

var db;
var auth;
var recipe;

// Initialize db pool and start restify server
MongoClient.connect("mongodb://"+Config.db.user+":"+Config.db.password+"@"+Config.db.host+":27017/"+Config.db.database, function(err, database) {
    if (err) {
	console.log('Unable to connect to the mongodb. Error:', err);
	return;
    }
    
    db = database;
    auth = new Auth(db);
    recipe = new Recipe(db);
    
    server.listen(port, function() {
	console.log('%s listening at %s', server.name, server.url);
    });
});

// Generic response handler
function handleResponse(res, err, resp) {
    if (err) {
	res.send(err);
    }
    res.json(resp);
}

// Authentication handler
function handleAuth(res, apikey, nextStep) {
    auth.validateKey(apikey, function(err,resp){
	if ( err != null ) {
	    handleResponse(res, {error:auth.err}, null);
	    return;
	}
	
	if ( resp == null ) {
	    handleResponse(res, {error:"Invalid Token"}, null);
	    return;
	}
	console.log("Action performed by " + resp.name);
	nextStep();
    });
}

// Generic requests/blank routes
server.get('/', function(req, res) {
    handleResponse(res, null, {message: 'Welcome to tkapi'});
});

server.post('/', function(req, res, next) {
    console.log("Hitting generic post endpoint");
    handleAuth(res, req.headers.apikey, function(){ handleResponse(res, null, {message: 'Welcome to tkapi'}) });
});


// Recipe handling
// return all recipes
server.get('/recipes', function(req,res) {
    recipe.findRecipes(function(err,resp) {
	handleResponse(res, err, resp);
    });
});

// create new recipe
server.post('/recipes', function(req,res,next) {
    var arr = _.keys(req);
    console.log("req keys " + arr);

    handleAuth(res, req.headers.apikey, function(){ next('postRecipe') });
});

server.post({
    name: 'postRecipe',
    path: '/recipes'
}, function(req,res) {
    console.log("req " + req.params);
    recipe.createRecipe(req.params, function(err,resp){
	handleResponse(res, err, resp);
    });
});

//update a recipe
server.put('/recipes', function(req,res) {
    //  console.log(req.params);
    var id = new ObjectID(req.params.id);
    delete req.params.id;
    recipe.saveRecipe(id, req.params, function(err, resp){
	handleResponse(res, err, resp);
    });
});


//opts needs to be set explicitly to allow delete
server.opts('/recipes/:id', function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'OPTIONS, DELETE');
    res.send(204);
    return next();
});
// delete a recipe
server.del('/recipes/:id', function(req,res, next) {
    //  console.log("here");
    //  console.log(req.params);
    var id = new ObjectID(req.params.id);
    //  handleResponse(res, null, {"ok":"ok"});
    
    recipe.deleteRecipe(id, function(err, resp){
	handleResponse(res, err, resp);
    });
});

// Recipes by ID handling
server.get('/recipes/id/:id', function(req,res) {
    var id = new ObjectID(req.params.id);
    recipe.findRecipeById(id, function(err, resp){
	handleResponse(res, err, resp);
    });
});

// Get recipe by name
server.get('/recipes/name/:name', function(req,res) {
    recipe.findRecipesByName(req.params.name, function(err, resp) {
	handleResponse(res, err, resp);
    });
});

// Category handling
// gets all categories - returns array of categories and all unique values
server.get('/categories', function(req,res) {
    recipe.getCategoriesAndValues(function(err, resp) {
	handleResponse(res, err, resp);
    });
});

// gets all values for category
server.get('/categories/:category', function(req,res) {
    recipe.getCategoryValues(req.params.category, function(err, resp) {
	handleResponse(res, err, resp);
    });
});

// returns all recipes matching a category and value
// ex. /recipes/meal/dinner
server.get('/recipes/:category/:value', function(req,res) {
    recipe.findByCategory(req.params.category, req.params.value, function(err, resp) {
	handleResponse(res, err, resp);
    });
});
