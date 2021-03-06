

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

var app = require('express')();
var serverSocket = require('http').createServer(app);
var io = require('socket.io')(serverSocket);
serverSocket.listen(process.env.PORT);
var clientSocketId = {};
var ambulanceId = {};
io.on('connection', function (socket) {  
  socket.emit('deviceId', {});
  socket.on('registerId', function (data) {
	  if(!data.isAmbulance){
		clientSocketId[data.deviceId] = data.id;
	  } else {
		ambulanceId[data.deviceId] = data.id;
	  }
  });
  socket.on('emergencyRequest', function (data) {
	   var amId = Object.keys(ambulanceId);
	   console.log(data,amId,ambulanceId);
	   io.to(ambulanceId[amId[0]]).emit("emergency", data);
  });
  socket.on('serviceAccept', function (data) {
	  var contactDetails = data.data.contact;
	  console.log(contactDetails,contactDetails.length);
	  for(var f = 0;f < contactDetails.length;f++){
		  console.log(contactDetails[f],clientSocketId[contactDetails[f]])
	   io.to(clientSocketId[contactDetails[f]] || ambulanceId[contactDetails[f]]).emit("emergencyServiceAccept", data);
	  }
  });
socket.on('reachedEmit', function (data) {
	  var contactDetails = data.data.contact;
	  console.log(contactDetails,contactDetails.length);
	  for(var f = 0;f < contactDetails.length;f++){
		  console.log(contactDetails[f],clientSocketId[contactDetails[f]])
	   io.to(clientSocketId[contactDetails[f]] || ambulanceId[contactDetails[f]]).emit("reachedDetails", data);
	  }
	console.log(data)
	io.to(clientSocketId['9940054516']).emit("reachedDetailsSource", data);
  });	
   socket.on('emergencyRequestCancel', function (data) {
	   var amId = Object.keys(ambulanceId);
	   console.log(data,amId,ambulanceId);
	   io.to(ambulanceId[amId[0]]).emit("requestCancel", data);
	var contactDetails = data.contact;
	  console.log(contactDetails,contactDetails.length);
	  for(var f = 0;f < contactDetails.length;f++){
		  console.log(contactDetails[f],clientSocketId[contactDetails[f]])
	   io.to(clientSocketId[contactDetails[f]] || ambulanceId[contactDetails[f]]).emit("requestCancel", data);
	  }
  });
});
console.log("SDasdSA");
/*
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
*/

