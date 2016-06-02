var _ = require('lodash');

function Recipe(db) {
    this.recipes = db.collection('recipes');
}

// finds all recipes in collection, returns as an array
Recipe.prototype.findRecipes = function(callback) {
  this.recipes.find().toArray(function (err, result) {
   if (err) {
     console.log(err);
   } else if (result.length) {
     console.log('Found ' + result.length);
   } else {
     console.log('No document(s) found with defined "find" criteria!');
   }
   callback(err, result);
 });
}

// create a new recipe, DOES NOT UPSERT!
Recipe.prototype.createRecipe = function(params, callback) {
    var recipes = this.recipes;
    console.log("params " + params.name);

    console.log("params");
    var arr = _.keys(params);
    console.log("arr keys " + arr);
    _.each(arr, function(a) {
	console.log(a);
    });
    _.forOwn(params, function(val,key) {
	console.log(key + " -> " + val);
    });
    this.recipes.findOne({name: { $regex: new RegExp("^" + params.name + "$", 'i') } } , function (err, result) {
	if (err) {
	    console.log(err);
	}
	if ( result != null ) {
	    // Document exists
	    callback(err, {"msg":"Recipe exists"});
	    return;
	}
	if ( _.isArray(params.categories) ) {
	    _.each(params.categories, function(cat, idx) {
		params.categories[idx].name = cat.name.toLowerCase();
		params.categories[idx].value = cat.value.toLowerCase();
	    })
		}
	recipes.insertOne(params, function(err, result) {
	    if (err) {
		console.log(err);
	    }
	    callback(err, {"msg":"Recipe added", "result":result});
	});
	console.log(params);
    });
}

// Updates an existing recipe
Recipe.prototype.saveRecipe = function(id, params, callback) {
  this.recipes.update({_id:id}, params, function(err, results) {
    if (err) {
      console.log(err);
    }
    callback(err,{message: 'Recipe updated', "results":results});
  });
  var err = null;
  callback(err,{message: 'Recipe saved'});
}

// Deletes a recipe by ID
Recipe.prototype.deleteRecipe = function(id, callback) {
  this.recipes.deleteOne({_id:id}, function(err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results.result.n);
    var msg = results.result.n === 0 ? "Recipe not found" : "Recipe deleted";
    callback(err,{message: msg, "results":results});
  });
}

// return one recipe by ID
Recipe.prototype.findRecipeById = function(id, callback) {
  this.recipes.find({_id:id}).toArray(function (err, result) {
   if (err) {
     console.log(err);
   }
   callback(err, result);
 });
}

// Searches recipes by name, case insensitive and partial matching
Recipe.prototype.findRecipesByName = function(recipeName, callback) {
   this.recipes.find({name: { $regex: new RegExp(recipeName, 'i') } } ).toArray(function (err, result) {
    if (err) {
      console.log(err);
    }
    callback(err, result);
  });
}

// returns all categories and their values
Recipe.prototype.getCategoriesAndValues = function(callback) {
  this.recipes.find({},{'categories':1,'_id':0}).toArray(function (err, results) {
//    callback(err, results);
    var categories = [];
    _.each(_.flatten(_.map(results, 'categories')), function(category) {
      var catIdx = _.findIndex(categories, {"name": category.name});
      if ( catIdx == -1 ) {
        categories.push({"name":category.name, "values":[]});
        catIdx = _.findIndex(categories, {"name":category.name});
      }
      if ( _.indexOf(categories[catIdx].values, category.value) == -1 ) {
        categories[catIdx].values.push(category.value);
      }
    });
    callback(err, categories);
  });
}

// get all values for a category
Recipe.prototype.getCategoryValues = function(categoryName, callback) {
  //get value where recipe.categories.name=categoryName;
  this.recipes.find({},{'categories':1,'_id':0}).toArray(function (err, results) {
    callback(err,_.union(_.map(_.filter(_.union.apply(_, _.map(results, 'categories')), {'name': categoryName.toLowerCase()}),'value')));
  });
}

// returns list of recipes matching category and value
Recipe.prototype.findByCategory = function(categoryName, categoryValue, callback) {
  //get value where recipe.categories.name=categoryName;
  this.recipes.find({
    'categories': {
      $elemMatch: {
        'name': categoryName.toLowerCase(),
        'value': categoryValue.toLowerCase()
      }
    }
  }).toArray(function (err, results) {
    callback(err, results);
  });
}

module.exports = Recipe;
