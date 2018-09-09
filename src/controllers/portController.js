import PortControl from '../lib/portControl'

export function getPort(request, response){
	response.send({
		name : PortControl.port
	})
}

export function setPort(request, response){
	let newPort = request.swagger.params.port.value.name
	PortControl.port = newPort
	response.send({
		name : newPort
	})
}