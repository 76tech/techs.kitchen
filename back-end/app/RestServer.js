var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var routes = require("./lib/routes.js");
var app  = express();
var config = require('./lib/Config.js');

function RestServer(){
     var self = this;
     self.connectMysql();
};

 RestServer.prototype.connectMysql = function() {
     var self = this;
     var pool      =    mysql.createPool({
         connectionLimit : 100,
         host     : 'localhost',
         user     : 'root',
         password : '',
         database : 'restful_api_demo',
         debug    :  false
     });
     pool.getConnection(function(err,connection){
         if(err) {
           self.stop(err);
         } else {
           self.configureExpress(connection);
         }
     });
}

 RestServer.prototype.configureExpress = function(connection) {
       var self = this;
       app.use(bodyParser.urlencoded({ extended: true }));
       app.use(bodyParser.json());
       var router = express.Router();
       app.use('/api', router);
       var rest_router = new rest(router,connection,md5);
       self.startServer();
}

 RestServer.prototype.startServer = function() {
       app.listen(8080,function(){
           console.log("TK Server running on port 8080");
       });
}

 RestServer.prototype.stop = function(err) {
     console.log("ERROR - MySQL error: " + err);
     process.exit(1);
}

new RestServer();
