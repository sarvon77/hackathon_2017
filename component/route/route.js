const Joi = require('joi');
var product = require("../controller/product");
var path = require('path');
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
					Location: Joi.string().required(),
					"price":Joi.string().required(),
					"image":Joi.string().required(),
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
					userId:Joi.string().optional()
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
					userId:Joi.string().valid('').optional(),
					postedBy:Joi.string().required(),
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
		method: 'GET',
		path:'/job/user/{id}', 		
		config: {
			description: 'Get engineer-job-save',
			notes: 'Get engineer-job-save',
			tags: ['api'],
			handler: product.jobUserList,
			validate: {
				params:{
					id:Joi.string().optional()
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
					lat: Joi.string().required(),
					isAdmin:Joi.boolean().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path:'/SMS', 		
		config: {
			description: 'send SMS',
			notes: 'send SMS',
			tags: ['api'],
			handler: product.smsSend,
			validate: {
				payload: {
					phone: Joi.string().required(),
					msg: Joi.string().required()
				}
			}
		}
	},{
		method: 'POST',
		path:'/search-youtube', 		
		config: {
			description: 'search youtube',
			notes: 'search youtube',
			tags: ['api'],
			handler: product.youtubeSearch,
			validate: {
				payload: {
					query: Joi.string().required()
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
					id: Joi.string().required(),
					"userId":Joi.string().required(),
					"rating":Joi.string().required(),
					"feedback":Joi.string().required()
				}
			}
		}
	},

	{
		method: 'GET',
		path:'/product/admin', 		
		config: {
			description: 'Get product admin',
			notes: 'Get product admin',
			tags: ['api'],
			handler: product.getforAdmin,
			validate: {
				
			}
		}
	},{
		method: 'POST',
		path:'/register', 		
		config: {
			description: 'register new Device',
			notes: 'register new Device',
			tags: ['api'],
			handler: product.register,
			validate: {
				payload: {
					deviceId: Joi.string().required(),
					userName: Joi.string().required(),
					"Location":Joi.string().required(),
					"image":Joi.string().required(),
					"mobileNo":Joi.string().required(),
				}
			}
		}
	},{
		method: 'POST',
		path:'/assignJob', 		
		config: {
			description: 'assign job to user',
			notes: 'assign job to user',
			tags: ['api'],
			handler: product.assignJob,
			validate: {
				payload: {
					id: Joi.string().required(),
					userId: Joi.string().required()
				}
			}
		}
	},{
		method: 'POST',
		path:'/search-keyword', 		
		config: {
			description: 'searched text',
			notes: 'searched text',
			tags: ['api'],
			handler: product.seachedtext,
			validate: {
				payload: {
					text: Joi.string().required(),
					userId: Joi.string().required()
				}
			}
		}
	},
	{
		method: 'GET',
		path:'/search-keyword-get', 		
		config: {
			description: 'searched text',
			notes: 'searched text',
			tags: ['api'],
			handler: product.seachedtextGet,
			validate: {
			}
		}
	},
	{
		method: 'GET',
		path:'/speech', 		
		config: {
			description: 'x',
			notes: 'x',
			tags: ['api'],
			handler:  {
			    file: path.join(__dirname, '../file/index.html')
			}
		}
	}
];

module.exports = route;