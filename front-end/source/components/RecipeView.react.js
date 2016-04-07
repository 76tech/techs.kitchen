var React = require('react');
var _ = require('lodash');

var RecipeView = React.createClass({

  formatAsListElement: function(item) {
    return <li key={item} eventKey={item}>{item}</li>;
  },
  formatNameAsListElement: function(item) {
    return <li key={item.id} eventKey={item.id} onSelect={this.props.onClickRecipe}>{item.name}</li>;
  },
  render: function() {
    var toRender;
//    console.log(this.props.activeview);
    switch(this.props.activeview) {
      case "recipe":
        toRender = this.renderRecipe();
        break;
      case "category":
        toRender = this.renderCategory();
        break;
      default:
        toRender = <div>Error - Unknown render mode {this.props.activeview}</div>;
        break;
    }
    return(toRender)
  },
  renderRecipe: function() {
//    console.log(this.props.recipe);
    //this.props.activeview
    //this.props.activecategory
    var recipe = _.find(this.props.recipes, {'id':this.props.activerecipe});
    console.log(this.props.activerecipe);
    var ingredients = recipe.ingredients.map(this.formatAsListElement);
    var method      = recipe.method.map(this.formatAsListElement);
    return (
      <div>
        <h1>{recipe.name}</h1>
        <h2>{recipe.description}</h2>
        <h3>Ingredients:</h3>
        <ul>{ingredients}</ul>
        <h3>Method:</h3>
        <ul>{method}</ul>
      </div>
    )
  },
  renderCategory: function() {
    var activecategory = this.props.activecategory.toLowerCase();

    var recipeList = []
    _.each(this.props.recipes, function(r) {
      _.each(r.categories, function(c) {
        if ( c.value.toLowerCase() === activecategory ) {
          recipeList.push(r);
        }
      });
    });
    var recipeNames = recipeList.map(this.formatNameAsListElement);
//    console.log(recipeList);
//    return this.renderRecipe();
    return (
      <div>
      <ul>{recipeNames}</ul>
      </div>
    )
  }
});

module.exports = RecipeView;
