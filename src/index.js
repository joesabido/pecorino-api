import Restify from 'restify'

var server = Restify.createServer()

function move(request, response, next){
	let x = request.params.xaxis
	let y = request.params.yaxis
	let z = request.params.zaxis
	let speed = request.params.speed

	response.send('success')

	console.log(x, y, z, speed)
	next()
}

server.get('/move/:xaxis/:yaxis/:zaxis/:speed', move)

server.listen(8080, function(){
	console.log('%s listening at %s', server.name, server.url)
})

