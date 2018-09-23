import SmoothieboardInterface from '../lib/smoothieboardInterface'
import Socket from '../lib/socket'

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
	
	let commandX = (position.x ? `X${position.x}` : '')
	let commandY = (position.y ? `Y${position.y}` : '')
	let commandZ = (position.z ? `Z${position.z}` : '')
	let speed = (position.speed ? `F${position.speed}` : '')

	let command = `G0 ${commandX} ${commandY} ${commandZ} ${speed}`.replace(/\s+/g, ' ')

	if(commandX || commandY || commandZ){
		SmoothieboardInterface.sendCommand(command)
	}else{
		Socket.io.emit('data', 'No axis information was received.')
	}

	response.send({
		x : position.x,
		y : position.y,
		z : position.z,
		speed : position.speed
	})
}

export function getHomeStatus(request, response){
	SmoothieboardInterface.sendCommand('G28.6')
	response.send({
		message:"Ok"
	})
}

export function goHome(request, response){
	SmoothieboardInterface.sendCommand('G28 X')
	response.send({
		message : "Ok"
	})
}

export function halt(request, response){
	SmoothieboardInterface.sendCommand('M999')
	response.send({
		message : "Ok"
	})
}