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
	},
	{
		method: 'POST',
		path:'/flipkart', 		
		config: {
			description: 'search flipkart',
			notes: 'search flipkart',
			tags: ['api'],
			handler: product.flipkart,
			validate: {
				payload: {
					product: Joi.string().required(),
					limit: Joi.number().required()
				}
			}
		}
	}
];

module.exports = route;