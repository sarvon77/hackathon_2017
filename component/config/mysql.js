var mysql  = require('mysql');
var mysqlQuery = {};
var _this = this;

mysqlQuery.connect = function(cb) {
	_this.connection = mysql.createConnection({
	  host     : 'sarvon77.heliohost.org',
	  user     : 'sarvon77_admin',
	  password : 'admin',
	  database : 'sarvon77_hackathon'
	});	 
	_this.connection.connect(function(err){
		if(!err) {
			console.log("connected mysql")
			cb();
		} else {
			console.log("connected not mysql",error)
		}
	});
	
}

mysqlQuery.query = function (query,cb) {
	this.connect(function() {
		_this.connection.query(query, function (error, results, fields) {
			_this.connection.end(function(err){
			if(!err){
				console.log("mysql ended");
			}
			});
			if(!error){
				cb(null,results, fields);
			} else{
				cb(true,error)
			}
		});
	})	
}

module.exports = mysqlQuery;
