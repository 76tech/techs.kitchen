$(document).ready(function () {
  displayCopyright();

  adminCheck();
  loggedInCheck();

  stickFooter();
});

// general button controls
$(document).on('click touch','#addRecipeButton',function(e){
    e.preventDefault();
    alert("Add Recipe")
});

$(document).on('click touch','#loginButton',function(e){
    e.preventDefault();
    alert("Login/Join");
});

$(document).on('click touch','#logoutButton',function(e){
    e.preventDefault();
    alert("Logout");
});

// browsing controls
$(document).on('click touch','.browseButton',function(e){
    e.preventDefault();
    var browseFunction = "category";
  if ( $(this).attr("data-function") ) {
    browseFunction = $(this).attr("data-function");
  }
    alert("Browsing by " + browseFunction);
});

//logged in user controls
function loggedInCheck() {
  // ajax call to check that user has a valid, i.e. non-expired, login cookie
  // if cookie is valid, show logged in user controls
  var loggedIn = true;
  if ( loggedIn ) {
    showUserControls();
  }
  else {
    hideUserControls();
  }
}

function showUserControls() {
  $('#addRecipeButton').show();
  $('#loginButton').hide();
  $('#logoutButton').show();
} //- ef

function hideUserControls() {
  $('#addRecipeButton').hide();
  $('#loginButton').show();
  $('#logoutButton').hide();
} //- ef


// admin button controls
$(document).on('click touch','#adminButton',function(e){
    e.preventDefault();
    alert("Admin");
});
$(document).on('click touch','.adminUsersButton',function(e){
    e.preventDefault();
    alert("Admin User Button");
});
$(document).on('click touch','.adminRecipeButton',function(e){
    e.preventDefault();
    alert("Admin Recipe Button");
});

function adminCheck() {
  // ajax call to check that user has a valid, i.e. non-expired, login cookie
  // *and* that user has admin privileges
  // if cookie is valid, show admin controls
  var adminEnabled = true;
  if (adminEnabled) {
    showAdminControls();
  }
  else {
    hideAdminControls();
  }
} //- ef

function showAdminControls() {
  $('#adminButton').show();
  $('.admin-funcs').show();
}

function hideAdminControls() {
  $('#adminButton').hide();
  $('.admin-funcs').hide();
}

function loadCategoryView() {

}

function loadCuisineView() {

}

function loadSeasonView() {

}

function displayCopyright() {
  var startYear = 2015;
  var curYear = new Date().getFullYear();
  var yearStr = "";
  if ( curYear > startYear ) {
    yearStr = startYear.toString() + "-" + curYear.toString();
  }
  else {
    yearStr = curYear.toString();
  }

  $('#copyright-statement').html("Content Copyright "+yearStr+", Tech's Kitchen, Oakmont, PA, USA");
}

function stickFooter() {
 $(window).bind("load", function () {
    var footer = $("#footer");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height();
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }
});
} //- ef
