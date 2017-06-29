var productModel = {};
productModel.searchNearBy = function(req,cb) {
	cb(null,{list:[
	{location:"chennai","shopList":[
	{"name":"a",qty:5},
	{"name":"b",qty:5},
	{"name":"c",qty:4},
	{"name":"d",qty:1},
	]}]})
}
module.exports = productModel;