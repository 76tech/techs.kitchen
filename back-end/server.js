// server.js
// main entry point for tkapi

var Recipe = require('./app/models/Recipe');
var restify = require('restify');
var server = restify.createServer();
var port = process.env.PORT || 8080;

// Server setup/config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));

// Generic requests/blank routes
server.get('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});
server.post('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});

// Recipe handling
server.get('/recipes', function(req,res) {
  Recipe.findRecipes(function(err,recipes) {
    if(err)
      res.send(err);
    res.json(recipes);
  });
});

// create new recipe
server.post('/recipes', function(req,res) {
  console.log(req.params.name);
  res.json({message: 'Recipe created'});//, body: JSON.stringify(req.body)});
});

// Recipes by ID handling
server.get('/recipes/:id', function(req,res) {
  Recipe.findOneRecipe(req.params.id, function(err,recipe) {
    if(err)
      res.send(err);
    res.json(recipe);
  });
});

// Category handling
// gets all categories - returns array of categories and all unique values
server.get('/categories', function(req,res) {
  Recipe.getCategoriesAndValues(function(err,categories) {
    if(err)
      res.send(err);
    res.json(categories);
  });
});

// gets all values for category
server.get('/categories/:category', function(req,res) {
  Recipe.getCategoryValues(req.params.category, function(err,categoryValues) {
    if(err)
      res.send(err);
    res.json(categoryValues);
  });
});

// returns all recipes matching a category and value
// ex. /recipes/meal/dinner
server.get('/recipes/:category/:value', function(req,res) {
  Recipe.findByCategory(req.params.category,req.params.value, function(err,recipe) {
    if(err)
      res.send(err);
    res.json(recipe);
  });
});

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
