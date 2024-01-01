import { IRouter, Request, Response, Router } from 'express'
import { IQuery } from '../interfaces'
import { CurrencyService } from '../services'

class CurrencyController {
	public path: string = '/'
	public router: IRouter = Router()
	private currencies: any = []
	private currencyService
	
	constructor() {
		this.currencyService = new CurrencyService()
		this.router.get('/conversions', this.getConversions)
		this.router.post('/conversions', this.postConversions)
	}
	
	private getConversions = async (req: Request, res: Response) => {
		try {
			
			const { from, to, date }: Partial<IQuery> = req.query
			const currencies: any = await this.currencyService.getCurrencies()
			
			return res.status(200).json(
				currencies.filter((t: any) =>
					(t.from === from || from === undefined) &&
					(t.to === to || to === undefined) &&
					(t.date === date || date === undefined)
				))
			
		} catch (err) {
			console.error(err)
			return res.status(400).end()
		}
	}
	
	private postConversions = async (req: Request, res: Response) => {
		try {
			
			const { url } = req.body
			const currencies: any = await this.currencyService.downloadCSV(url, this.currencies.length > 0)
			this.currencies = Array.from(new Set([...this.currencies, ...currencies]))
			await this.currencyService.writeToCSV(this.currencies)
			return res.status(200).end()
			
		} catch (err) {
			console.error(err)
			return res.status(400).end()
		}
	}
}

export default CurrencyController