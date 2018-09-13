import SerialPort from 'serialport'
import BindingMock from '@serialport/binding-mock'
import Fs from 'fs'

const portDevice = '/dev/ttyACM0'

if(Fs.existsSync(portDevice) === false){
	SerialPort.Binding = BindingMock
	SerialPort.Binding.createPort(portDevice, {
		echo : true,
		record : true
	})
}

const port = new SerialPort(portDevice, {
	autoOpen : true
})

port.on('data', (data) => {
	console.log(`Data: ${data}`)
})

port.on('error', (error) => {
	console.log(`${error}`)
})

const commands = {
	getPinsStatus : 'M119\n',
	moveABit : 'M999\nM17\n\nG91\nG0 X200 F3000\n',
	goHome : 'G28 X\n',
	checkIfHome: 'G28.6\n'
}

const SmoothieboardInterface = {
	sendCommand : (command) => {
		port.write(`${command}\n`)
	}
}

//SmoothieboardInterface.sendCommand('M999')
//SmoothieboardInterface.sendCommand('M17')
//SmoothieboardInterface.sendCommand('G91')

export default SmoothieboardInterface