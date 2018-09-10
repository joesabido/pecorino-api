import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function getPort(request, response){
	response.send({
		name : PortControl.port
	})
}

export function setPort(request, response){
	let newPort = request.swagger.params.port.value.name
	SmoothieboardInterface.port = newPort
	response.send({
		name : newPort
	})
}