// server.js
// main entry point for tkapi

var Recipe = require('./app/models/Recipe');
var restify = require('restify');
var server = restify.createServer();
var port = process.env.PORT || 8080;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));

server.get('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});
server.post('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});

server.post('/recipes', function(req,res) {
  console.log(req.params.name);
  res.json({message: 'Recipe created'});//, body: JSON.stringify(req.body)});
});

server.get('/recipes', function(req,res) {
  Recipe.find(function(err,recipes) {
    if(err)
      res.send(err);
    res.json(recipes);
  });
});

server.get('/recipes/:id', function(req,res) {
  Recipe.findOne(req.params.id, function(err,recipe) {
    if(err)
      res.send(err);
    res.json(recipe);
  });
});

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
