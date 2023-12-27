import { IRouter, Request, Response, Router } from 'express'

class TestController {
	public path: string = '/'
	public router: IRouter = Router()
	
	constructor() {
		this.router.get('/test', this.getTest)
		this.router.post('/test', this.postTest)
	}
	
	private getTest = async (req: Request, res: Response) => {
		try {
			
			return res.status(200).json({
				success: true
			})
			
		} catch (err) {
			console.error(err)
			return res.status(400).end()
		}
	}
	
	private postTest = async (req: Request, res: Response) => {
		try {
			
			return res.status(200).json({
				success: true
			})
			
		} catch (err) {
			console.error(err)
			return res.status(400).end()
		}
	}
}

export default TestController