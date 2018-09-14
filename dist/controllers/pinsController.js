'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPinsStatus = getPinsStatus;

var _smoothieboardInterface = require('../lib/smoothieboardInterface');

var _smoothieboardInterface2 = _interopRequireDefault(_smoothieboardInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPinsStatus(request, response) {
	_smoothieboardInterface2.default.sendCommand('M119');
	response.send({
		message: 'Ok'
	});
}