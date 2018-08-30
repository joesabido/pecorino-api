'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function Control() {
	_classCallCheck(this, Control);

	this.sendCommand = function (command, parameters) {
		console.log('send');
	};

	this.commands = {
		M18: 'M18',
		M17: 'M17',
		G91: 'G91',
		G0: 'X Y Z F'
	};

	this.device = '/dev/ttyACM0';
};

exports.default = new Control();