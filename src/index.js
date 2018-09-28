import Express from 'express'
import SwaggerTools from 'swagger-tools'
import JsYaml from 'js-yaml'
import Path from 'path'
import Fs from 'fs'
import Http from 'http'
import Cors from 'cors'
import Socket from './lib/socket'
import Readline from 'readline'

const app = Express()
const server = Http.createServer(app)
const io = Socket.setup(server)

//import SmoothieboardInterface from './lib/smoothieboardInterface'

const serverPort = 3000
const controllerPath = Path.join(__dirname, '/controllers')
const swaggerYamlPath = Path.join(__dirname, '/swagger.yaml')
const ReadlinePrompt = Readline.createInterface({
	input : process.stdin,
	output : process.stdout,
	terminal : false,
	prompt : 'Command > '
})

const routerOptions = {
	controllers : controllerPath
}

const spec = Fs.readFileSync(swaggerYamlPath, 'utf8')
const swaggerDoc = JsYaml.safeLoad(spec)

ReadlinePrompt.on('line', (line) => {
	if(line !== undefined && line.toString().trim() !== ''){
		//SmoothieboardInterface.sendCommand(line.toString().trim().toUpperCase())
		ReadlinePrompt.prompt()
	}
})

SwaggerTools.initializeMiddleware(swaggerDoc, (swaggerMw) => {
	app.use(Cors())
	app.use(swaggerMw.swaggerMetadata())
	app.use(swaggerMw.swaggerValidator())
	app.use(swaggerMw.swaggerRouter(routerOptions))
	app.use(swaggerMw.swaggerUi())
	
	server.listen(serverPort, () => {
		ReadlinePrompt.prompt()
	})
})