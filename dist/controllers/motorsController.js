'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.enableMotors = enableMotors;
exports.disableMotors = disableMotors;

var _smoothieboardInterface = require('../lib/smoothieboardInterface');

var _smoothieboardInterface2 = _interopRequireDefault(_smoothieboardInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function enableMotors(request, response) {
	_smoothieboardInterface2.default.sendCommand('M17');
	response.send({
		message: 'Ok'
	});
}

function disableMotors(request, response) {
	_smoothieboardInterface2.default.sendCommand('M18');
	response.send({
		message: 'Ok'
	});
}