var React = require('react');
var _ = require('lodash');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Button = require('react-bootstrap/lib/Button');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var listStyle = {
  padding: '0'
};
var listItemStyle = {
  display: 'inline-block',
  listStyle: 'none'
};

var RecipeCategoryList = React.createClass({
  getListOfRecipeIds: function() {
    return Object.keys(this.props.recipes);
  },
  getRecipeCategoryNames: function(recipeId) {
    var recipe = this.props.recipes[recipeId];
    return _.pluck(recipe.categories, 'name');
  },
//  getRecipeCategoryValues: function(categoryName) {
//    return _.pluck(_.where(this.props.recipes, {name:categoryName}),'value');
//    var recipe = this.props.recipes[recipeId];
//    return _.pluck(recipe.categories, 'name');
//  },
  getAllCategoryValues: function(categoryName) {
    //get value where recipe.categories.name=categoryName;
    return _.union(_.pluck(_.filter(_.union.apply(_, _.pluck(this.props.recipes, 'categories')), {'name':categoryName}),'value'));
  },
  getRecipeCategoryValues: function(recipeId) {
    var recipe = this.props.recipes[recipeId];
    return _.pluck(recipe.categories[categoryName], 'value');
  },
  getAllCategories: function() {
    return _.union.apply(_, this.getListOfRecipeIds().map(this.getRecipeCategoryNames) );
  },
  formatCategoryEntryAsListElement: function(categoryEntry) {
    return <MenuItem id={categoryEntry} key={categoryEntry} eventKey={categoryEntry} onSelect={this.props.onClickCategory}>{_.startCase(categoryEntry)}</MenuItem>
  },
  formatCategoryAsListElement: function(category) {
    var categoryEntryItems = this.getAllCategoryValues(category).map(this.formatCategoryEntryAsListElement);
    return <DropdownButton id={category} title={_.startCase(category)} key={category} eventKey={category}>{categoryEntryItems}</DropdownButton>;

//    return <NavItem key={category} eventKey={category}>{_.startCase(category)}</NavItem>;
    //return <NavItem eventKey={category}>{_.startCase(category)}</li>;
  },
  categorySelect: function(selectedCategory) {
    alert('selected ' + selectedCategory);
  },
alertalert: function() { alert('foo');},
  render: function() {
    var recipeCategoryList = this.getAllCategories().map(this.formatCategoryAsListElement);
//    console.log(recipeCategoryList);

    return (
      <ButtonGroup vertical bsStyle="pills" stacked>
        {recipeCategoryList}
      </ButtonGroup>
//      <Nav bsStyle="pills" stacked onSelect={this.props.onClickCategory}>
//        {recipeCategoryList}
//      </Nav>
//      <div><ul>{recipeCategoryList}</ul></div>
    );
  }

});

module.exports = RecipeCategoryList;
