'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _swaggerTools = require('swagger-tools');

var _swaggerTools2 = _interopRequireDefault(_swaggerTools);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var serverPort = 3000;
var controllerPath = _path2.default.join(__dirname, '/controllers');
var swaggerYamlPath = _path2.default.join(__dirname, '/swagger.yaml');

var routerOptions = {
	controllers: controllerPath
};

var spec = _fs2.default.readFileSync(swaggerYamlPath, 'utf8');
var swaggerDoc = _jsYaml2.default.safeLoad(spec);

_swaggerTools2.default.initializeMiddleware(swaggerDoc, function (swaggerMw) {
	app.use(swaggerMw.swaggerMetadata());
	app.use(swaggerMw.swaggerValidator());
	app.use(swaggerMw.swaggerRouter(routerOptions));
	app.use(swaggerMw.swaggerUi());

	app.listen(serverPort, function () {
		console.log('Listening on http://localhost:%d ', serverPort);
	});
});