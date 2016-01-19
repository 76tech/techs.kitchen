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
function saveRecipe(callback) {
  callback();
}

function deleteRecipe() {
  callback();
}

function find(callback) {
  var err = null;
  callback(err, [{'name':'water'}, {'name':'ice'}]);
}

function findOne(id,callback) {
  var err = null;
  callback(err, [{'id':id,'name':'water'}]);
}

function findByCategory(category,value,callback) {
  var err = null;
  callback(err, [{'category':category,'value':value,'name':'water'}]);
}

//};

//module.exports = Recipe;
module.exports.saveRecipe = saveRecipe;
module.exports.deleteRecipe = deleteRecipe;
module.exports.find = find;
module.exports.findOne = findOne;
module.exports.findByCategory = findByCategory;
