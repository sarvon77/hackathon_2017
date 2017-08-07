var productModel = require("../model/product");
var product = {};
product.searchNearBy = function(req,reply) {
	productModel.searchNearBy(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ.list});
		}
	})
	
}

product.flipkart = function(req,reply) {
	productModel.flipkart(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
	
}
product.saveToadmin = function(req,reply) {
	productModel.saveToadmin(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":"success"});
		}
	})
}
product.seachedtext = function(req,reply) {
	productModel.seachedtext(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":"success"});
		}
	})
}
product.seachedtextGet = function(req,reply) {
	productModel.seachedtextGet(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.getToadmin = function(req,reply) {
	productModel.getToadmin(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.engineerLocationSet = function(req,reply) {
	productModel.engineerLocationSet(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.jobsList = function(req,reply) {
	productModel.jobsList(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.jobSave = function(req,reply) {
	productModel.jobSave(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.jobUserList = function(req,reply) {
	productModel.jobUserList(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}


product.engineerLocationGet = function(req,reply) {
	productModel.engineerLocationGet(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.getWeather = function(req,reply) {
	productModel.getWeather(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.jobCompleted = function(req,reply) {
	productModel.jobCompleted(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.smsSend = function(req,reply) {
	productModel.smsSend(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":"success"});
		}
	})
}
product.youtubeSearch = function(req,reply) {
	productModel.youtubeSearch(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}

product.getforAdmin = function(req,reply) {
	productModel.getforAdmin(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}

product.register = function(req,reply) {
	productModel.register(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.assignJob = function(req,reply) {
	productModel.assignJob(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":succ});
		}
	})
}
product.engineerStatus = function(req,reply) {
	productModel.engineerStatus(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":"success"});
		}
	})
}

product.speech = function(req,reply) {
	return reply.file('../file/index.html');
}
product.truncateTables = function(req,reply) {
	productModel.truncateTables(req,function(err,succ){
		if(err){
			return reply({status:400,"message":"failed"});
		} else {
			return reply({status:200,"data":"success"});
		}
	})
}

module.exports = product;