import Express from 'express'
import SwaggerTools from 'swagger-tools'
import JsYaml from 'js-yaml'
import Path from 'path'
import Fs from 'fs'
import Http from 'http'
import Cors from 'cors'

import Smoothieboard from './lib/Smoothieboard'

const app = Express()
const server = Http.createServer(app)
const serverPort = 3000
const swaggerConfig = JsYaml.safeLoad(Fs.readFileSync(Path.join(__dirname, '/swagger.yaml'), 'utf8'))
const swaggerControllers = Path.join(__dirname, '/controllers')
const smoothie = new Smoothieboard({
	server : server,
	portDevice : '/dev/ttyACM0'
})

SwaggerTools.initializeMiddleware(swaggerConfig, swaggerMw => {
	app.use(Cors())
	app.use(smoothie.middleware())
	app.use(swaggerMw.swaggerMetadata())
	app.use(swaggerMw.swaggerValidator())
	app.use(swaggerMw.swaggerRouter({ controllers : swaggerControllers }))
	app.use(swaggerMw.swaggerUi())
	
	server.listen(serverPort, () => {
		smoothie.showShell()
	})
})