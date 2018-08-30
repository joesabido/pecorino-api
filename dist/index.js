'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _restify2.default.createServer();

function move(request, response, next) {
	var x = request.params.xaxis;
	var y = request.params.yaxis;
	var z = request.params.zaxis;
	var speed = request.params.speed;

	response.send('success');

	console.log(x, y, z, speed);
	next();
}

server.get('/move/:xaxis/:yaxis/:zaxis/:speed', move);

server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});