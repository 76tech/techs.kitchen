// server.js
// main entry point for tkapi

var restify = require('restify');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var server = restify.createServer();
var port = process.env.PORT || 8080;

var Recipe = require('./models/Recipe');
var Config = require('./lib/Config');

// Server setup/config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));

var db;
var recipes;

// Initialize db pool and start restify server
MongoClient.connect("mongodb://"+Config.db.user+":"+Config.db.password+"@"+Config.db.host+":27017/"+Config.db.database, function(err, database) {
  if (err) {
    console.log('Unable to connect to the mongodb. Error:', err);
    return;
  }

  db = database;
  recipes = db.collection('recipes');

  server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
});

function handleResponse(res, err, resp) {
  if (err) {
    res.send(err);
  }
  res.json(resp);
}

// Generic requests/blank routes
server.get('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});
server.post('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});

// Recipe handling
// return all recipes
server.get('/recipes', function(req,res) {
  Recipe.findRecipes(recipes, function(err,resp) {
    handleResponse(res, err, resp);
  });
});

// create new recipe
server.post('/recipes', function(req,res) {
//  console.log(req.params);
  Recipe.createRecipe(recipes, req.params, function(err,resp){
    handleResponse(res, err, resp);
  });
});

//update a recipe
server.put('/recipes', function(req,res) {
//  console.log(req.params);
  var id = new ObjectID(req.params.id);
  delete req.params.id;
  Recipe.saveRecipe(recipes, id, req.params, function(err, resp){
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

  Recipe.deleteRecipe(recipes, id, function(err, resp){
    handleResponse(res, err, resp);
  });
});

// Recipes by ID handling
server.get('/recipes/id/:id', function(req,res) {
  var id = new ObjectID(req.params.id);
  Recipe.findRecipeById(recipes, id, function(err, resp){
    handleResponse(res, err, resp);
  });
});

server.get('/recipes/name/:name', function(req,res) {
  Recipe.findRecipesByName(recipes, req.params.name, function(err, resp) {
    handleResponse(res, err, resp);
  });
});

// Category handling
// gets all categories - returns array of categories and all unique values
server.get('/categories', function(req,res) {
  Recipe.getCategoriesAndValues(recipes, function(err, resp) {
    handleResponse(res, err, resp);
  });
});

// gets all values for category
server.get('/categories/:category', function(req,res) {
  Recipe.getCategoryValues(recipes, req.params.category, function(err, resp) {
    handleResponse(res, err, resp);
  });
});

// returns all recipes matching a category and value
// ex. /recipes/meal/dinner
server.get('/recipes/:category/:value', function(req,res) {
  Recipe.findByCategory(recipes, req.params.category, req.params.value, function(err, resp) {
    handleResponse(res, err, resp);
  });
});
