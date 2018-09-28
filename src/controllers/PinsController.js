export function getPinsStatus(request, response){
	request.smoothie.sendCommand('M119')
	response.send({
		message: 'Ok'
	})
}