import Express from 'express'
import SwaggerTools from 'swagger-tools'
import JsYaml from 'js-yaml'
import Path from 'path'
import Fs from 'fs'
import Http from 'http'
import Cors from 'cors'
//import Readline from 'readline'

import SmoothieboardMw from './lib/SmoothieboardMw'

const app = Express()
const server = Http.createServer(app)
const serverPort = 3000
const swaggerConfig = JsYaml.safeLoad(Fs.readFileSync(Path.join(__dirname, '/swagger.yaml'), 'utf8'))

/*
const ReadlinePrompt = Readline.createInterface({
	input : process.stdin,
	output : process.stdout,
	terminal : false,
	prompt : 'Command > '
})

ReadlinePrompt.on('line', (line) => {
	if(line !== undefined && line.toString().trim() !== ''){
		//SmoothieboardInterface.sendCommand(line.toString().trim().toUpperCase())
		//ReadlinePrompt.prompt()
	}
})
*/

SwaggerTools.initializeMiddleware(swaggerConfig, swaggerMw => {
	app.use(Cors())
	app.use(SmoothieboardMw(server))
	app.use(swaggerMw.swaggerMetadata())
	app.use(swaggerMw.swaggerValidator())
	app.use(swaggerMw.swaggerRouter({ controllers : Path.join(__dirname, '/controllers') }))
	app.use(swaggerMw.swaggerUi())
	
	server.listen(serverPort, () => {
		//ReadlinePrompt.prompt()
	})
})