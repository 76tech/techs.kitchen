var _ = require('lodash');
/*
var Recipe = {
  id: '',
  name: '',
  description: '',
  ingredients: [],
  method: [],
  categories: [],
  DB: techskitchen
  collection: recipes

*/


var testRecipes = [
{
  'id':1,
  'name':'Puttanesca Sauce',
  'description':'Bold, spicy tomato based pasta sauce',
  'equipment':['Saucepan', 'Wooden spoon'],
  'ingredients':['1/3 cup olive oil', '5 cloves garlic', '2 tsp anchovy paste', '1/2 tsp red pepper flakes',
                 '1 tsp salt', '1 28 oz can crushed tomatoes', '1/2 cup Kalamata olives, pitted and chopped',
                 '2 tbsp capers, drained', 'Sugar, 1 pinch', '3/4 cup coarsely chopped basil'
               ],
  'method':['Saute garlic, anchovy paste, red pepper flakes, and salt in olive oil until garlic is tender',
            'Stir in tomatoes, olives, capers, sugar.  Simmer for 30 minutes.',
            'Toss with pasta, sprinkle with basil.'],
  'categories':[{'name':'cuisine','value':'Italian'},
                {'name':'meal','value':'dinner'},
                {'name':'course','value':'main'}]
},
{
  'id':2,
  'name':'Spaghetti (boxed)',
  'description':'Just boxed spaghetti',
  'ingredients':['Spaghetti, 1 box', 'Water', 'Salt'],
  'method':['Salt water in large pot.', 'Bring salted water to rolling boil',
            'Add pasta to boiling water while stirring to prevent sticking',
            'When water returns to boil, cook according to package directions, stirring occassionally'],
  'categories':[{'name':'cuisine','value':'Italian'},
                {'name':'meal','value':'dinner'},
                {'name':'course','value':'main'}]
}
];

// find all recipes
function findRecipes(callback) {
  var err = null;
  callback(err, testRecipes);
}

function createRecipe(params, callback) {
  var err = null;
  callback(err,{message: 'Recipe created'});
}

function saveRecipe(params, callback) {
  var err = null;
  callback(err,{message: 'Recipe saved'});
}

function deleteRecipe(id, callback) {
  var err = null;
  callback(err,{message: 'Recipe deleted'});
}

// return one recipe by ID
function findOneRecipe(id,callback) {
  var err = null;
  var recipe = _.find(testRecipes, function(r) { return r.id == id; } );
  callback(err, recipe);
}

// returns all categories and their values
function getCategoriesAndValues(callback) {
  var err = null;

  var categories = [];
  var roughCats = _.flatten(_.map(testRecipes, 'categories'));
  _.each(_.flatten(_.map(testRecipes, 'categories')), function(category) {
    var catIdx = _.findIndex(categories, {"name":category.name});
    if ( catIdx == -1 ) {
      categories.push({"name":category.name, "values":[]});
      catIdx = _.findIndex(categories, {"name":category.name});
    }
    if ( _.indexOf(categories[catIdx].values, category.value) == -1 ) {
      categories[catIdx].values.push(category.value);
    }
  });
  callback(err, categories);
}

// get all values for a category
function getCategoryValues(categoryName,callback) {
  //get value where recipe.categories.name=categoryName;
  var err = null;
  callback(err,_.union(_.map(_.filter(_.union.apply(_, _.map(testRecipes, 'categories')), {'name':categoryName}),'value')));
}

// returns list of recipes matching category and value
function findByCategory(categoryName,categoryValue,callback) {
  //get value where recipe.categories.name=categoryName;
  var err = null;
  callback(err, _.filter(testRecipes, {"categories.name":categoryName, "categories.value":categoryValue}));
//  callback(err,_.union(_.map(_.filter(_.union.apply(_, _.map(testRecipes, 'categories')), {'name':categoryName}),'value')));
}

//-----------------------------------
/*
function getListOfRecipeIds() {
  return Object.keys(testRecipes);
}

function getRecipeCategoryNames(recipeId) {
  var recipe = testRecipes[recipeId];
  return _.map(recipe.categories, 'name');
}

function getRecipeCategories(recipeId) {
  var recipe = testRecipes[recipeId];
  return recipe.categories;
}

function getCategories(callback) {
  var err = null;
  callback(null, _.union.apply(_, getListOfRecipeIds().map(getRecipeCategoryNames) ) );
}
*/


//function findByCategory(category,value,callback) {
//  var err = null;
//  callback(err, [{'category':category,'value':value,'name':'water'}]);
//}

//};

//module.exports = Recipe;
module.exports.findRecipes = findRecipes;
module.exports.saveRecipe = saveRecipe;
module.exports.createRecipe = createRecipe;
module.exports.deleteRecipe = deleteRecipe;
module.exports.findOneRecipe = findOneRecipe;
module.exports.getCategoriesAndValues = getCategoriesAndValues;
module.exports.getCategoryValues = getCategoryValues;
module.exports.findByCategory = findByCategory;
