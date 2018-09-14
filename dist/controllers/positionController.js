'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPosition = getPosition;
exports.moveToPosition = moveToPosition;
exports.getHomeStatus = getHomeStatus;
exports.goHome = goHome;
exports.halt = halt;

var _smoothieboardInterface = require('../lib/smoothieboardInterface');

var _smoothieboardInterface2 = _interopRequireDefault(_smoothieboardInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPosition(request, response) {
	_smoothieboardInterface2.default.sendCommand('M114.1');
	response.send({
		x: 1,
		y: 2,
		z: 3
	});
}

function moveToPosition(request, response) {
	var position = request.swagger.params.position.value;
	_smoothieboardInterface2.default.sendCommand('G0 X' + position.x + ' F3000');
	response.send({
		x: position.x,
		y: position.y,
		z: position.z
	});
}

function getHomeStatus(request, response) {
	_smoothieboardInterface2.default.sendCommand('G28.6');
	response.send({
		message: "Ok"
	});
}

function goHome(request, response) {
	_smoothieboardInterface2.default.sendCommand('G28 X');
	response.send({
		message: "Ok"
	});
}

function halt(request, response) {
	_smoothieboardInterface2.default.sendCommand('M999');
	response.send({
		message: "Ok"
	});
}