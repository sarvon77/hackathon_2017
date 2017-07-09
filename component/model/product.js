var request = require("request"),
	moment = require("moment"),
	mysql = require("./../config/mysql")
	flipkartKeys = {
		"FkAffiliateId" :"sarvon77h",
		"FkAffiliateToken":"848584129dd14c54ab669d548dc7764e",
		"url":"https://affiliate-api.flipkart.net/affiliate/search/json?"
	},
	productModel = {};
productModel.searchNearBy = function(req,cb) {
	cb(null,{list:[
	{location:"chennai","shopList":[
	{"name":"a",qty:5},
	{"name":"b",qty:5},
	{"name":"c",qty:4},
	{"name":"d",qty:1},
	]}]})
}

productModel.flipkart = function(req,cb) {
	var options = {
	  url: flipkartKeys.url+"query="+req.payload.product+"&resultCount="+req.payload.limit,
	  headers: {
		'Fk-Affiliate-Id': flipkartKeys.FkAffiliateId,
		'Fk-Affiliate-Token':flipkartKeys.FkAffiliateToken
	  }
	};
 
	request(options, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			cb(null,info.productInfoList);
		} else {
			cb(true);
		}
	});
}
productModel.saveToadmin = function(req,cb) {
	var data = req.payload;
	var productId = data.productId,
		productName = data.productName,
		productUrl = data.productUrl,
		productCount = data.productCount,
		orderBy = data.orderBy,
		orderFor = data.orderFor,
		Location = data.Location,
		orderOn = moment().format("YYYY-MM-DD hh:mm:ss");
	var insertQuery = "insert into product_order(productId,productName,productUrl,productCount,orderBy,orderFor,Location,orderOn) values('"+productId+"','"+productName+"','"+productUrl+"','"+productCount+"','"+orderBy+"','"+orderFor+"','"+Location+"','"+orderOn+"')";
	mysql.query(insertQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	});
}

productModel.getToadmin = function(req,cb) {
	var getQuery = "select * from product_order";
	mysql.query(getQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	});
}
productModel.engineerLocationGet = function(req,cb) {
	var queryData = req.query,
		id = "";
	var getQuery = "select * from engineer_location";
	if(queryData.id || queryData.deviceId) {
		if(queryData.id && queryData.deviceId) {
			getQuery = getQuery + " where id = '" +queryData.id+"' and deviceId = '" +queryData.deviceId+"'";
		} else if(queryData.id) {
			getQuery = getQuery + " where id = '" +queryData.id+"'";
		} else {
			getQuery = getQuery + " where deviceId = '" +queryData.deviceId+"'";
		}		
	}
	//console.log(getQuery);
	mysql.query(getQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	});
}
productModel.jobsList = function(req,cb) {	
	
	//console.log(typeof req.params.userId);
	var getQuery = "select * from jobs where userId = '" + req.params.userId +"'";
	mysql.query(getQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	});
}
productModel.jobSave = function(req,cb) {
	var data = req.payload;
	var userId = data.userId,
		Location= data.Location,
		Address= data.Address,
		customerName= data.customerName,
		customerContactNo= data.customerContactNo,
		jobOn= moment(data.jobOn).format("YYYY-MM-DD hh:mm:ss"),
		appliedOn= moment().format("YYYY-MM-DD hh:mm:ss"),
		reason= data.reason;
	var insertQuery = "insert into `jobs`(`userId`,`Location`,`Address`,`customerName`,`customerContactNo`,`jobOn`,`appliedOn`,`reason`) values('"+userId+"','"+Location+"','"+Address+"','"+customerName+"','"+customerContactNo+"','"+jobOn+"','"+appliedOn+"','"+reason+"')";
	mysql.query(insertQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	});
}
productModel.engineerLocationSet = function(req,cb) {
	var data = req.payload;
	var id = data.id,
		location = data.location,
		updateOn = moment().format("YYYY-MM-DD hh:mm:ss"),
		engineerName = data.name;
	var getQuery = "select * from engineer_location where id='"+id+"'";
	mysql.query(getQuery,function(err,succ) {
		if(err) {
			
			//console.log("xzcxz",getQuery);
			cb(true,"failed");
		} else {
			var insertOrUpdateQuery = ""
			if(succ.length > 0){
				insertOrUpdateQuery = "UPDATE engineer_location SET location = '"+location+"', updateOn = '"+updateOn+"',engineerName = '"+engineerName+"' where id ='" + id +"'";
			} else {
				insertOrUpdateQuery = "insert into engineer_location(`location`,`updateOn`,`engineerName`) values('"+location+"','"+updateOn+"','"+engineerName+"')";
			}			
			mysql.query(insertOrUpdateQuery,function(err,succ) {
				if(err) {
					//console.log("in",insertOrUpdateQuery)
					cb(true,"failed");
					
				} else {
					cb(null,{userId:(succ.insertId + 1)});
				}
			});
		}
	});
}
productModel.getWeather = function(req,cb) {
	
	var options = {
	  url: "http://api.openweathermap.org/data/2.5/weather?lat="+req.payload.lat+"&lon="+req.payload.lon+"&appid=1a925075cbf3e058b53ac31d39b12f1e"
	};
 
	request(options, function(error, response, body){
		//console.log(req.payload,options);
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			cb(null,{weather:info});
		} else {
			cb(true);
		}
	});
}
productModel.jobCompleted = function(req,cb) {
	var updateQuery = "UPDATE jobs SET status = '"+req.payload.status+"' where id ='" + req.payload.id +"'";
	mysql.query(updateQuery,function(err,succ) {
		if(err) {
			//console.log("in",insertOrUpdateQuery)
			cb(true,"failed");
			
		} else {
			cb(null,"success");
		}
	});
}
module.exports = productModel;