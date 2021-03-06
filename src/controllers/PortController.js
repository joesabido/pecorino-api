export function getPort(request, response){
	response.send({
		name : request.smoothie.portDevice
	})
}

export function setPort(request, response){
	let port = request.swagger.params.port.value.name
	request.smoothie.openPort(port)
	response.send({
		name : port
	})
}

export function cyclePort(request, response){
	let currentPort = request.smoothie.portDevice
	request.smoothie.openPort(currentPort)
	response.send({
		name : currentPort
	})
}