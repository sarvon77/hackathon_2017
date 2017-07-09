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
	},
	{
		method: 'POST',
		path:'/product/save', 		
		config: {
			description: 'save product',
			notes: 'save product',
			tags: ['api'],
			handler: product.saveToadmin,
			validate: {
				payload: {
					productId: Joi.string().required(),
					productName: Joi.string().required(),
					productUrl: Joi.string().required(),
					productCount: Joi.number().required(),
					orderBy: Joi.string().required(),
					orderFor: Joi.string().required(),
					Location: Joi.string().required()
				}
			}
		}
	},
	{
		method: 'GET',
		path:'/product/get', 		
		config: {
			description: 'Get product',
			notes: 'Get product',
			tags: ['api'],
			handler: product.getToadmin,
			validate: {
				
			}
		}
	},
	{
		method: 'GET',
		path:'/engineer-location/get', 		
		config: {
			description: 'Get engineer-location',
			notes: 'Get engineer-location',
			tags: ['api'],
			handler: product.engineerLocationGet,
			validate: {
				query:{
					id:Joi.string().optional(),
					deviceId: Joi.string().optional()
				}
			}
		}
	},
	{
		method: 'GET',
		path:'/job/list/{userId}', 		
		config: {
			description: 'Get engineer-job-list',
			notes: 'Get engineer-job-list',
			tags: ['api'],
			handler: product.jobsList,
			validate: {
				params:{
					userId:Joi.string().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path:'/job/save', 		
		config: {
			description: 'Get engineer-job-save',
			notes: 'Get engineer-job-save',
			tags: ['api'],
			handler: product.jobSave,
			validate: {
				payload:{
					userId:Joi.string().required(),
					Location: Joi.string().required(),
					Address: Joi.string().required(),
					customerName: Joi.string().required(),
					customerContactNo: Joi.string().required(),
					jobOn: Joi.string().required(),
					reason: Joi.string().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path:'/engineer-location/save', 		
		config: {
			description: 'save engineer-location',
			notes: 'save engineer-location',
			tags: ['api'],
			handler: product.engineerLocationSet,
			validate: {
				payload: {
					id: Joi.string().required(),
					location: Joi.string().required(),
					name: Joi.string().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path:'/dashboard', 		
		config: {
			description: 'Weather',
			notes: 'Weather',
			tags: ['api'],
			handler: product.getWeather,
			validate: {
				payload: {
					lon: Joi.string().required(),
					lat: Joi.string().required()
				}
			}
		}
	},{
		method: 'POST',
		path:'/job/completed', 		
		config: {
			description: 'Job status',
			notes: 'Job status',
			tags: ['api'],
			handler: product.jobCompleted,
			validate: {
				payload: {
					status: Joi.string().required(),
					id: Joi.string().required()
				}
			}
		}
	},
];

module.exports = route;