import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function getPosition(request, response){
	SmoothieboardInterface.sendCommand('M114.1')
	response.send({
		x : 1,
		y : 2,
		z : 3
	})
}

export function moveToPosition(request, response){
	let position = request.swagger.params.position.value
	SmoothieboardInterface.sendCommand(`G0 X${position.x} F3000`)
	response.send({
		x : position.x,
		y : position.y,
		z : position.z
	})
}

export function goHome(request, response){
	SmoothieboardInterface.sendCommand('G28 X')
	response.send({
		message : "Ok"
	})
}

export function getHomeStatus(request, response){
	SmoothieboardInterface.sendCommand('G28.6')
	response.send({
		message:"Ok"
	})
}

export function reset(request, response){
	SmoothieboardInterface.sendCommand('M999')
	//SmoothieboardInterface.sendCommand('M17')
	//SmoothieboardInterface.sendCommand('G0 X10 F3000')
	response.send({
		message : "Ok"
	})
}