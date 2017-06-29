const Joi = require('joi');
var product = require("../controller/product")
var route = [
	{
		method: 'GET',
		path:'/hello', 		
		config: {
			description: 'test',
			notes: 'test',
			tags: ['api'],
			handler: function(req,reply){
				return reply({status:400,"message":"failed"});
			},
		}
	},
	{
		method: 'POST',
		path:'/searchNearBy', 		
		config: {
			description: 'search nearby',
			notes: 'search nearby',
			tags: ['api'],
			handler: product.searchNearBy,
			validate: {
				payload: {
					product: Joi.string().required()
				}
			}
		}
	}
];

module.exports = route;