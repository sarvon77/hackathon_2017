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
module.exports = product;