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

module.exports = product;