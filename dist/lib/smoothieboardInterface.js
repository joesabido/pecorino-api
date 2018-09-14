'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _serialport = require('serialport');

var _serialport2 = _interopRequireDefault(_serialport);

var _bindings = require('@serialport/bindings');

var _bindings2 = _interopRequireDefault(_bindings);

var _bindingMock = require('@serialport/binding-mock');

var _bindingMock2 = _interopRequireDefault(_bindingMock);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmoothieboardInterface = function () {
	function SmoothieboardInterface() {
		(0, _classCallCheck3.default)(this, SmoothieboardInterface);

		this.portDevice = null;
		this.port = null;
		this.mockPort = false;
	}

	(0, _createClass3.default)(SmoothieboardInterface, [{
		key: 'openPort',
		value: function openPort(portDevice) {
			if (portDevice === undefined || portDevice.trim() === '') {
				console.log('ERROR: openPort requireds portDevice.');
				return;
			} else {
				this.portDevice = portDevice;
			}

			if (_fs2.default.existsSync(portDevice) === false) {
				console.log('WARNING: Port ' + portDevice + ' was not found. Creating a virtual port...');
				_serialport2.default.Binding = _bindingMock2.default;
				_serialport2.default.Binding.createPort(portDevice, {
					echo: true,
					record: true
				});
			} else {
				_serialport2.default.Binding = _bindings2.default;
			}

			this.port = new _serialport2.default(portDevice), {
				autoOpen: true
			};

			this.port.on('data', function (data) {
				console.log(('Data:' + data).trim());
			});

			this.port.on('error', function (error) {
				console.log('' + error);
			});
		}
	}, {
		key: 'sendCommand',
		value: function sendCommand(command) {
			this.port.write(command + '\n');
		}
	}]);
	return SmoothieboardInterface;
}();

//SmoothieboardInterface.sendCommand('M999')
//SmoothieboardInterface.sendCommand('M17')
//SmoothieboardInterface.sendCommand('G91')

/*
const commands = {
	getPinsStatus : 'M119\n',
	moveABit : 'M999\nM17\n\nG91\nG0 X200 F3000\n',
	goHome : 'G28 X\n',
	checkIfHome: 'G28.6\n'
}
*/

var Smoothie = new SmoothieboardInterface();

Smoothie.openPort('/dev/ttyACM0');

exports.default = Smoothie;