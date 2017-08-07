var mysql  = require('mysql');
var mysqlQuery = {};
var _this = this;

mysqlQuery.connect = function(cb,no) {
	_this.connection = mysql.createConnection({
	  host     : 'sarvon77.heliohost.org',
	  //user     : no == 1?'sarvon77_admin':no == 2?"sarvon77_vignesh":"sarvon77_ragav",
	  user:"sarvon77_admin",
	  password : 'admin',
	  database : 'sarvon77_hackathon'
	});	 
	_this.connection.connect(function(err){
		if(!err) {
			console.log("connected mysql");
			//console.log(arguments)
			cb();
		} else {
			console.log("connected not mysql",err)
			if(err.indexOf("TOO_MANY_USER") > -1){
				console.log("****************************************");
			}
		}
	});
	
}

mysqlQuery.query = function (query,cb,no) {
	//this.connect(function() {
		_this.connection.query(query, function (error, results, fields) {
			if(!error){
				cb(null,results, fields);
			} else{
				cb(true,error)
			}
			/*_this.connection.end(function(err){
			if(!err){
				console.log("mysql ended");
			}
			});
			if(!error){
				cb(null,results, fields);
			} else{
				cb(true,error)
			}*/
		});
	//},no)	
}

module.exports = mysqlQuery;