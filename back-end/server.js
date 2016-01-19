// server.js
// main entry point for tkapi

var express = require('express');
var json = require('express-json');

var Recipe = require('./app/models/Recipe');

var app = express();

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'Welcome to tkapi'});
});

router.route('/recipes')
  .post(function(req,res) {
    console.log(JSON.stringify(req));
    res.json({message: 'Recipe created', body: JSON.stringify(req.body)});
//    var recipe = new Recipe();
//    recipe.name = req.body.name;

//    recipe.save(function(err) {
//      if (err)
//        res.send(err);
//      res.json({message: 'Recipe created'});
//    });
  })
  .get(function(req,res) {
    Recipe.find(function(err,recipes) {
      if(err)
        res.send(err);
      res.json(recipes);
    });
  });

router.route('/recipes/:id')
  .get(function(req,res) {
    Recipe.findOne(req.params.id, function(err,recipe) {
      if(err)
        res.send(err);
      res.json(recipe);
    });
  });

  router.route('/recipes/:category/:value')
    .get(function(req,res) {
      Recipe.findByCategory(req.params.category,req.params.value, function(err,recipe) {
        if(err)
          res.send(err);
        res.json(recipe);
      });
    });

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
