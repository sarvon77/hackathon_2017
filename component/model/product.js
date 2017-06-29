var request = require("request"),
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
module.exports = productModel;