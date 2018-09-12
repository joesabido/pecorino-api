import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function getPinsStatus(request, response){
	SmoothieboardInterface.sendCommand()
	response.send({
		message: 'Ok'
	})
}