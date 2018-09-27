import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function getPinsStatus(request, response){
	SmoothieboardInterface.sendCommand('M119')
	response.send({
		message: 'Ok'
	})
}