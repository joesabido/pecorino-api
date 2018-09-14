import SerialPort from 'serialport'
import Binding from '@serialport/bindings'
import BindingMock from '@serialport/binding-mock'
import Fs from 'fs'

class SmoothieboardInterface{
	constructor(){
		this.portDevice = null
		this.port = null
		this.mockPort = false
	}

	openPort(portDevice){
		if(portDevice === undefined || portDevice.trim() === ''){
			console.log(`ERROR: openPort requireds portDevice.`)
			return
		}else{
			this.portDevice = portDevice
		}

		if(Fs.existsSync(portDevice) === false){
			console.log(`WARNING: Port ${portDevice} was not found. Creating a virtual port...`)
			SerialPort.Binding = BindingMock
			SerialPort.Binding.createPort(portDevice, {
				echo : true,
				record : true
			})
		}else{
			SerialPort.Binding = Binding
		}

		this.port = new SerialPort(portDevice), {
			autoOpen : true
		}

		this.port.on('data', (data) => {
			console.log(`Data:${data}`.trim())
		})
		
		this.port.on('error', (error) => {
			console.log(`${error}`)
		})
	}

	sendCommand(command){
		this.port.write(`${command}\n`)
	}
}

//SmoothieboardInterface.sendCommand('M999')
//SmoothieboardInterface.sendCommand('M17')
//SmoothieboardInterface.sendCommand('G91')

/*
const commands = {
	getPinsStatus : 'M119\n',
	moveABit : 'M999\nM17\n\nG91\nG0 X200 F3000\n',
	goHome : 'G28 X\n',
	checkIfHome: 'G28.6\n'
}
*/

const Smoothie = new SmoothieboardInterface()

Smoothie.openPort('/dev/ttyACM0')

export default Smoothie