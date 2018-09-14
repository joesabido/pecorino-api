'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPort = getPort;
exports.setPort = setPort;

var _smoothieboardInterface = require('../lib/smoothieboardInterface');

var _smoothieboardInterface2 = _interopRequireDefault(_smoothieboardInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPort(request, response) {
	response.send({
		name: _smoothieboardInterface2.default.portDevice
	});
}

function setPort(request, response) {
	var port = request.swagger.params.port.value.name;
	_smoothieboardInterface2.default.openPort(port);
	response.send({
		name: port
	});
}