var React = require('react');

var RecipeCategoryList = require('./RecipeCategoryList.react');
var RecipeView         = require('./RecipeView.react');

var Application = React.createClass({
  getInitialState: function() {
    return {
      recipes: [
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
      ],
      activeview: "recipe",
      activecategory: "",
      activerecipe: 1
    }
  },

  clickCategory: function(event,category) {
    event.preventDefault();
    alert('selected ' + category);
    this.setState({activecategory: category,
                   activeview: 'category',
                   activerecipe: 1});
  },
  clickRecipe: function(event,id) {
    event.preventDefault();
    this.setState({activecategory: "",
                   activeview: 'recipe',
                   activerecipe: id});
//    console.log("Second");
//    console.log(this.state);
  },
  removeAllRecipes: function() {
    this.setState( { recipes: {} } );
  },

  render: function() {
    return (
      <div className="HolyGrail-body">
        <main className="HolyGrail-content">
          <RecipeView
            onClickRecipe =  {this.clickRecipe}
            activeview =     {this.state.activeview}
            activecategory = {this.state.activecategory}
            activerecipe =   {this.state.activerecipe}
            recipes =        {this.state.recipes}
          />
        </main>
        <nav className="HolyGrail-nav">
          <RecipeCategoryList
            onClickCategory = {this.clickCategory}
            recipes =         {this.state.recipes}
          />
        </nav>
      </div>
    );
  }
});

module.exports = Application;
