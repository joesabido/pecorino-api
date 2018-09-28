import SerialPort from 'serialport'
import Binding from '@serialport/bindings'
import BindingMock from '@serialport/binding-mock'
import Fs from 'fs'
import SocketIO from 'socket.io'

class Smoothieboard{
	constructor(options){		
		this.portDevice = options.portDevice
		this.server = options.server
		this.port = null
		this.mockPort = false
		this.socket = null
		
		this.initialize()
		this.openPort()
	}

	initialize = () => {
		this.socket = SocketIO(this.server)
	}

	openPort = () => {
		if(!this.portDevice || this.portDevice === undefined || this.portDevice.trim() === ''){
			this.socket.emit('error', 'openPort requires portDevice.')
			return
		}else{
			this.socket.emit('data', `Port has been set to ${this.portDevice.toString().trim()}`)
		}

		if(Fs.existsSync(this.portDevice) === false){
			console.log(`WARNING: Port ${this.portDevice} was not found. Creating a virtual port...`)
			SerialPort.Binding = BindingMock
			SerialPort.Binding.createPort(this.portDevice, {
				echo : true,
				record : true
			})
		}else{
			SerialPort.Binding = Binding
		}

		this.port = new SerialPort(this.portDevice), {
			autoOpen : true
		}

		this.port.on('data', (data) => {
			let stringData = data.toString('utf8')
			this.socket.emit('data', stringData)
		})
		
		this.port.on('error', (error) => {
			let stringError = error.toString('utf8')
			this.socket.emit('data', stringError)
		})
	}

	error = (error) => {
		this.socket.emit('data', error)
	}

	sendCommand = (command) => {
		this.port.write(`${command}\n`)
	}
}

export default Smoothieboard