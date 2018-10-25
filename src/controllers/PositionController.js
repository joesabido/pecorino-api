export function getPosition(request, response){
	request.smoothie.sendCommand('M114.1')
	response.send({
		x : 1,
		y : 2,
		z : 3
	})
}

export function moveToPosition(request, response){
	let position = request.swagger.params.position.value
	
	let commandX = (position.x !== undefined && position.x.toString().trim() !== '' ? `X${position.x}` : '')
	let commandY = (position.y !== undefined && position.y.toString().trim() !== '' ? `Y${position.y}` : '')
	let commandZ = (position.z !== undefined && position.z.toString().trim() !== '' ? `Z${position.z}` : '')
	let speed = (position.speed ? `F${position.speed}` : '')

	let command = `G0 ${commandX} ${commandY} ${commandZ} ${speed}`.replace(/\s+/g, ' ')

	if(commandX || commandY || commandZ){
		request.smoothie.sendCommand(command)
	}else{
		request.smoothie.error('No axis information was received.')
	}

	response.send({
		x : position.x,
		y : position.y,
		z : position.z,
		speed : position.speed
	})
}

export function getHomeStatus(request, response){
	request.smoothie.sendCommand('G28.6')
	response.send({
		message:"Ok"
	})
}

export function setHome(request, response){
	request.smoothie.sendCommand('G28.3')
	response.send({
		message:"Ok"
	})
}

export function goHome(request, response){
	request.smoothie.sendCommand('G28')
	response.send({
		message : "Ok"
	})
}

export function halt(request, response){
	request.smoothie.sendCommand('M999')
	response.send({
		message : "Ok"
	})
}