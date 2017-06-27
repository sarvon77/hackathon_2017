const Joi = require('joi');

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
	}
];

module.exports = route;