import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function getPort(request, response){
	response.send({
		name : SmoothieboardInterface.portDevice
	})
}

export function setPort(request, response){
	let port = request.swagger.params.port.value.name
	SmoothieboardInterface.openPort(port)
	response.send({
		name : port
	})
}