const functions = require('firebase-functions');
var MongoClient = require('mongodb').MongoClient;

var PROD_URI = functions.config().remotable.dburl;

var _db;

module.exports = {
	connectToServer: function(callback){
		MongoClient.connect(PROD_URI, function(err, db){
			_db = db;
			return callback(err);
		});
	},
	getDb: function(){
		return _db;
	}
}
// var db = null;

// module.exports = {
// 	init: function(callback) {
// 		MongoClient.connect(PROD_URI, (error, database) => {
// 			if (error)
// 		        reject(error);
// 		    db = database;
// 		    callback(database);
// 		});
// 	}
// }

