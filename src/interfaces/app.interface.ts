export interface IApp {
	port: number
	middlewares: any
	controllers: any
}

export interface IMiddleware {
	forEach: (arg0: (middleware: any) => void) => void
}

export interface IController {
	forEach: (arg0: (controller: any) => void) => void
}