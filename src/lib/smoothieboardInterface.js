import SerialPort from 'serialport'
import Binding from '@serialport/bindings'
import BindingMock from '@serialport/binding-mock'
import Fs from 'fs'

import Socket from './socket'

class SmoothieboardInterface{
	constructor(){
		this.portDevice = null
		this.port = null
		this.mockPort = false
	}

	openPort(portDevice){
		if(!portDevice || portDevice === undefined || portDevice.trim() === ''){
			Socket.io.emit('error', 'openPort requires portDevice.')
			return
		}else{
			this.portDevice = portDevice
			Socket.io.emit('data', `Port has been set to ${portDevice.toString().trim()}`)
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
			let stringData = data.toString('utf8')
			Socket.io.emit('data', stringData)
		})
		
		this.port.on('error', (error) => {
			let stringError = error.toString('utf8')
			Socket.io.emit('data', stringError)
		})
	}

	sendCommand(command){
		this.port.write(`${command}\n`)
	}
}

const Smoothie = new SmoothieboardInterface()

Smoothie.openPort('/dev/ttyACM0')

export default Smoothie