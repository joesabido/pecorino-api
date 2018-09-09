"use strict";

module.exports = {
	getPosition: function getPosition(request, response) {
		response.send({
			xAxis: 10,
			yAxis: 20,
			zAxis: 30
		}).json();
	}
};