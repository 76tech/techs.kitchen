var _ = require('lodash');

var recipes = [
  {
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

function getProperties(recipes) {
  var recipeProperties = _.map(recipes, 'properties.name');
  console.log(recipeProperties);
  return recipeProperties;
  /*
  var recipeProperties = [];
  _.forEach(recipes, function(recipe) {
    _.forEach(recipe.properties, function(property) {
      if ( !recipeProperties[property.name] ) {
        recipeProperties[property.name] = [];
      }
      recipeProperties[property.name].push(property);
    });
  });

    _.forEach(recipes, function(recipe) {
        if ( recipe.properties ) {
          _.forEach(recipe.properties) {
            if ( recipeProperties)
          }
        }
    }
  )
  */
}
/*

recipe
name
description
properties
meal
season
category
cuisine
*/

module.exports = {
  getProperties: getProperties
};
