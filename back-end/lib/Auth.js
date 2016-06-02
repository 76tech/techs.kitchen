function Auth(db) {
    this.users = db.collection('users');
}

Auth.prototype.validateKey = function(apikey, callback) {
    var auth = {'err':null, 'token':null};

    this.users.find({'apikey':apikey}).toArray(function (err, result) {
	if (err) {
	    auth.err = err;
	}
	if ( result.length > 1 ) {
	    err = "API Key Not Unique";
	}
	callback(err, result[0]);
    });
}

module.exports = Auth;
