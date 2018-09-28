export function enableMotors(request, response){
	request.smoothie.sendCommand('M17')
	response.send({
		message : 'Ok'
	})
}

export function disableMotors(request, response){
	request.smoothie.sendCommand('M18')
	response.send({
		message : 'Ok'
	})
}