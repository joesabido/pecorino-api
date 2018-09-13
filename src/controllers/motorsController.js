import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function enableMotors(request, response){
	SmoothieboardInterface.sendCommand('M17')
	response.send({
		message : 'Ok'
	})
}

export function disableMotors(request, response){
	SmoothieboardInterface.sendCommand('M18')
	response.send({
		message : 'Ok'
	})
}