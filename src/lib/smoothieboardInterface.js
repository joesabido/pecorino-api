import SerialPort from 'serialport'

const portDevice = '/dev/ttyACM0'
const port = new SerialPort(portDevice, {
	autoOpen : true
})

port.on('data', (data) => {
	console.log(`Data: ${data}`)
})

port.on('error', (error) => {
	console.log(`Error: ${error}`)
})

const SmoothieboardInterface = {
	sendCommand : () => {
		port.write('M119\n', (error) => {
			if(error){
				console.log(error)
			}
		})
	}
}

export default SmoothieboardInterface