var router = require('./component/route/route');


const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
/*var mysql = require("./component/config/mysql");
mysql.query("select * from mproduct_order",function(err,succ) {
	console.log(err || succ);
});*/
const server = new Hapi.Server();
server.connection({
        //host: "localhost",
        port: process.env.PORT || 3000,
		 routes: { cors: true } 
    });
 
const options = {
    info: {
            'title': 'Test API Documentation',
            'version': Pack.version,
        }
    };
 
server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    }], (err) => {
        server.start( (err) => {
           if (err) {
                console.log(err);
            } else {
                console.log('Server running at:', server.info.uri);
            }
        });
    });

	
router.map(function(routerData) {
	server.route(routerData);
})

