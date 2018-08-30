

class Control{
	constructor(){
		this.commands = {
			M18 : `M18`,
			M17 : `M17`,
			G91 : `G91`,
			G0 : `X Y Z F`
		}

		this.device = '/dev/ttyACM0'
	}

	sendCommand = (command, parameters) => {
		console.log('send')
	}

}

export default new Control()