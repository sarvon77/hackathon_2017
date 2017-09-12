var mysql  = require('mysql');
var mysqlQuery = {};
var _this = this;

mysqlQuery.connect = function(cb,no) {
	var configHelioHost = {
	  host     : 'sarvon77.heliohost.org',
	  //user     : no == 1?'sarvon77_admin':no == 2?"sarvon77_vignesh":"sarvon77_ragav",
	  user:"sarvon77_admin",
	  password : 'admin',
	  database : 'sarvon77_hackathon'
	}
	var configNew = {
	  host     : '148.66.136.189',
	  user:"admincts",
	  password : 'admincts',
	  database : 'hackathon_cts'
	}
	var configNew1 = {
	  host     : 'bbwemcxbx-mysql.services.clever-cloud.com',
	  user:"uumefxzkitrmfxfb",
	  password : 'GKXplEYmDrkUYCJNM1S',
	  database : 'bbwemcxbx'
	}
	_this.connection = mysql.createConnection(configNew1);	 
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
	_this.connection.on('error', function(err) {
		console.log('db error', err);
		_this.connection.connect(function(){
			console.log("db reconnected");
		});
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