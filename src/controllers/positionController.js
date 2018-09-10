import SmoothieboardInterface from '../lib/smoothieboardInterface'

export function getPosition(request, response){
	response.send({
		x : 1,
		y : 2,
		z : 3
	})
}

export function moveToPosition(request, response){
	let position = request.swagger.params.position.value
	response.send({
		x : position.x,
		y : position.y,
		z : position.z
	})
}