import express, { Application } from 'express'
import { IApp, IMiddleware, IController } from './interfaces'

class App {
	private app: Application
	private readonly port: number
	
	constructor(app: IApp) {
		this.app = express()
		this.port = app.port
		
		this.app.disable('x-powered-by')
		
		this.middlewares(app.middlewares)
		this.routes(app.controllers)
	}
	
	private middlewares(middlewares: IMiddleware): void {
		middlewares.forEach(middleware => {
			this.app.use(middleware)
		})
	}
	
	private routes(controllers: IController): void {
		controllers.forEach(controller => {
			this.app.use(controller.path, controller.router)
		})
	}
	
	public listen(): void {
		this.app.listen(this.port, (): void => {
			console.log(`App listening on the http://localhost:${this.port}`)
		})
	}
}

export default App