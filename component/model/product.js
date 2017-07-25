var request = require("request"),
	moment = require("moment"),
	_ = require("underscore"),
	async = require("async"),
	mysql = require("./../config/mysql")
	flipkartKeys = {
		"FkAffiliateId" :"sarvon77h",
		"FkAffiliateToken":"848584129dd14c54ab669d548dc7764e",
		"url":"https://affiliate-api.flipkart.net/affiliate/search/json?"
	},
	productModel = {};
	console.log(async.each)
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
		price = data.price,
		image = data.image,
		orderOn = moment().format("YYYY-MM-DD hh:mm:ss");
	var insertQuery = "insert into product_order(productId,productName,productUrl,productCount,orderBy,orderFor,Location,orderOn,image,price) values('"+productId+"','"+productName+"','"+productUrl+"','"+productCount+"','"+orderBy+"','"+orderFor+"','"+Location+"','"+orderOn+"','"+image+"','"+price+"')";
	mysql.query(insertQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	},1);
}

productModel.getToadmin = function(req,cb) {
	var getQuery = "select * from product_order";
	mysql.query(getQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	},2);
}

productModel.engineerLocationGet = function(req,cb) {
	var queryData = req.query,
		id = "",
		_this = this;
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
			if(succ.length == 0) {
				cb(null,[{"isNewUser":true}]);
			} else{
				cb(null,succ);
			}			
		}
	},3);
}
productModel.jobsList = function(req,cb,isfn) {		
	var parmasData = "";
	var getQuery = "";
	
	if(isfn) {
		parmasData = req;
		getQuery = "select * from jobs where userId = '" + parmasData +"' order by jobOn ASC";
	} else if(req.params.userId !="{userId}") {
		parmasData = req.params.userId;
		getQuery = "select * from jobs where userId = '" + parmasData +"' order by jobOn ASC";
	} else {
		getQuery = "select * from jobs order by jobOn ASC";
	}
	//console.log(req.params.userId)
	mysql.query(getQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	},1);
}
productModel.jobSave = function(req,cb) {
	var data = req.payload;
	var userId = data.userId || "",
		postedBy= data.postedBy,
		Location= data.Location,
		Address= data.Address,
		customerName= data.customerName,
		customerContactNo= data.customerContactNo,
		jobOn= moment(data.jobOn).format("YYYY-MM-DD hh:mm:ss"),
		appliedOn= moment().format("YYYY-MM-DD hh:mm:ss"),
		reason= data.reason;
	var insertQuery = "insert into `jobs`(`userId`,`postedBy`,`Location`,`Address`,`customerName`,`customerContactNo`,`jobOn`,`appliedOn`,`reason`) values('"+userId+"','"+postedBy+"','"+Location+"','"+Address+"','"+customerName+"','"+customerContactNo+"','"+jobOn+"','"+appliedOn+"','"+reason+"')";
	mysql.query(insertQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	},2);
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
			},3);
		}
	},3);
}
productModel.getWeather = function(req,cb) {
	var _this = this,
		isAdmin = req.payload.isAdmin;
	var options = {
	  url: "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+req.payload.lat+"&lon="+req.payload.lon+"&appid=1a925075cbf3e058b53ac31d39b12f1e"
	};
 	
	request(options, function(error, response, body){
		//console.log(req.payload,options);
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			if(isAdmin) {				
				_this.adminOrderCnt(function(err,succ) {
					if(!err) {
						_this.adminJobsCnt(function(cnterr,cntsucc){
							if(cnterr){
								cb(null,{weather:info,orderedProduct:succ});
							} else {
								cb(null,{weather:info,orderedProduct:succ,jobdetails:cntsucc});
							}
						})
						
					} else {
						cb(null,{weather:info});
					}
				});
			} else {
				cb(null,{weather:info});
			}
			
		} else {
			cb(true);
		}
	});
}
productModel.adminOrderCnt = function(cb) {
	var urlGet = "select count(*) as orderCnt from product_order";
	mysql.query(urlGet,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {					
			cb(null,succ[0]);
		}
	},2) 
}
productModel.adminJobsCnt = function(cb) {
	var urlGet = "select count(*) as JobsCnt,status from jobs group by status";
	mysql.query(urlGet,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {					
			cb(null,succ);
		}
	},2)
}
productModel.jobCompleted = function(req,cb) {
	var _this = this;
	var updateQuery = "UPDATE jobs SET status = '"+req.payload.status+"',rating= '"+req.payload.rating+"',feedback= '"+req.payload.feedback+"' where id ='" + req.payload.id +"'";
	mysql.query(updateQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
			
		} else {
			var selectQuery = "SELECT FLOOR(SUM(`rating`) / COUNT(*)) AS rating FROM `jobs` WHERE `userId` ='"+ req.payload.userId +"'";
			console.log(selectQuery)
			mysql.query(selectQuery,function(err,succ) {
				if(!err){
					var updateQuery = "UPDATE `engineer_location` SET `rating` = '" + succ[0].rating + "' WHERE `id` = '"+ req.payload.userId +"'";
					console.log(updateQuery);
					mysql.query(updateQuery,function(err,succ) {
						if(err) {
							
						}
					});
				}
			},1)
			_this.jobsList(req.payload.userId,function(err,data){
				if(err){
					cb(true,"failed");
				} else {					
					cb(null,data);
				}
			},true);
		}
	},1);
}
productModel.smsSend = function(req,cb) {
	var options = {
	  url: "https://sarvon-cts.000webhostapp.com/sendsms.php?uid=8903639221&pwd=A2258Q&phone="+req.payload.phone+"&msg="+req.payload.msg
	};
 
	request(options, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			cb(null,"success");
		} else {
			cb(true);
		}
	});
}
productModel.youtubeSearch = function(req,cb) {
	var options = {
	  url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDLcZXtAtz7CATMGI71BQlJgkIo5Knce98&part=snippet&q="+req.payload.query
	};
 
	request(options, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			var responseData = [];			
			/*_.each(info.data.items,function(videoDetails) {
				responseData.push({
					"videoId":videoDetails.id.videoDetails,
					"title":videoDetails.snippet.title,
					"desc":videoDetails.snippet.description
				})
			})*/
			cb(null,info);
		} else {
			cb(true);
		}
	});
}
productModel.getforAdmin = function(req,cb) {
	var urlGet = "select * from product_order";
	mysql.query(urlGet,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {					
			cb(null,succ);
		}
	},2)
}

productModel.register = function(req,cb) {
	var payLoadData = req.payload;
	var sqlQuery = "INSERT INTO `engineer_location`(`location`, `updateOn`, `engineerName`, `deviceId`, `rating`, `image`, `isAdmin`,`isCustomer`,`mobileNo`) VALUES ";
	sqlQuery += " ('"+payLoadData.Location+"','"+moment().format("YYYY-MM-DD HH:mm:ss")+"','"+payLoadData.userName+"','"+payLoadData.deviceId+"',0,'"+payLoadData.image+"',0,1,'"+payLoadData.mobileNo+"')";
	mysql.query(sqlQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,succ);
		}
	},2);
}

productModel.jobUserList = function(req,cb) {
	var urlGet = "select * from jobs where postedBy = '"+req.params.id+"' order by jobOn ASC ";
	mysql.query(urlGet,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			var postData = [];
			var i=0;
			async.each(succ,function(data,eachcb) {
				postData.push(data);
				if(data.userId != ""){
					var sqlQuery = "select * from engineer_location where id ='" + data.userId + "'";
					mysql.query(sqlQuery,function(err,innerSucc) {
						if(!err){
							postData[i].engineerDetails = innerSucc[0];
							//console.log(innerSucc)
						}
						i++;
						eachcb();
					});
				} else {
					i++;
					eachcb();
				}				

			},function(err,cbSuc) {
				if(!err) {
					cb(null,postData)
				}
			})					
			//cb(null,succ);
		}
	},2)
}
productModel.assignJob = function(req,cb) {
	var updateQuery = "UPDATE jobs SET userId ='"+req.payload.userId+"' where id='"+req.payload.id+"'";
	mysql.query(updateQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,"success");
		}
	},2)
}
productModel.seachedtext = function(req,cb) {
	var updateQuery = "insert into searchQuery(`userId`,`text`) values('"+req.payload.userId+"','"+req.payload.text+"')";
	mysql.query(updateQuery,function(err,succ) {
		if(err) {
			cb(true,"failed");
		} else {
			cb(null,"success");
		}
	},2)
}
module.exports = productModel;