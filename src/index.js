import Express from 'express'
import SwaggerTools from 'swagger-tools'
import JsYaml from 'js-yaml'
import Path from 'path'
import Fs from 'fs'
import Http from 'http'
import Cors from 'cors'
import Socket from './lib/socket'

const app = Express()
const server = Http.createServer(app)
const io = Socket.setup(server)
const serverPort = 3000
const controllerPath = Path.join(__dirname, '/controllers')
const swaggerYamlPath = Path.join(__dirname, '/swagger.yaml')

const routerOptions = {
	controllers : controllerPath
}

const spec = Fs.readFileSync(swaggerYamlPath, 'utf8')
const swaggerDoc = JsYaml.safeLoad(spec)

SwaggerTools.initializeMiddleware(swaggerDoc, (swaggerMw) => {
	app.use(Cors())
	app.use(swaggerMw.swaggerMetadata())
	app.use(swaggerMw.swaggerValidator())
	app.use(swaggerMw.swaggerRouter(routerOptions))
	app.use(swaggerMw.swaggerUi())
	
	server.listen(serverPort, () => {
		console.log('Listening on http://localhost:%d ', serverPort)
	})
})