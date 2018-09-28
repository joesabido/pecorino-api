export function sendCustomCommand(request, response){
    let command = request.swagger.params.commandData.value.command

    if(command !== undefined && command.toString().trim() !== ''){
        request.smoothie.sendCommand(command)
    }

	response.send({
		message : 'Ok'
	})
}