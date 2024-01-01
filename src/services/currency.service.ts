import fs from 'fs'
import path from 'path'
import https from 'https'
import { v4 as uuidv4 } from 'uuid'
import { parse } from 'csv-parse'
import { ICurrencies } from '../interfaces'

export default class CurrencyService {
	private filename: string = path.join(__dirname, '../assets/data.csv')
	
	async downloadCSV(url: string, isNew: boolean) {
		try {
			
			return new Promise((resolve, reject): void => {
				https.get(url, (response): void => {
					let data: string = ''
					
					response.on('data', (chunk: any): void => {
						data += chunk
					})
					
					response.on('end', () => {
						const file: string = isNew
							? path.join(__dirname, `../assets/${uuidv4()}.csv`)
							: this.filename
						
						if (!isNew) fs.writeFileSync(file, data, 'utf8')
						return resolve(data.split('\n').filter(Boolean))
					})
					
				}).on('error', (err: Error) => {
					console.error('Error downloading CSV file:', err)
					return reject(err)
				})
			})
			
		} catch (err) {
			throw err
		}
	}
	
	async writeToCSV(currencies: any): Promise<void> {
		try {
			fs.writeFileSync(this.filename, currencies.join('\n'), 'utf8')
		} catch (err) {
			throw err
		}
	}
	
	async getCurrencies() {
		try {
			
			if (!fs.existsSync(this.filename)) return []
			
			return new Promise((resolve, reject): void => {
				const data: (ICurrencies | never)[] = []
				fs.createReadStream(this.filename)
					.pipe(parse({ delimiter: ',', from_line: 1 }))
					.on('data', (row): void => {
						data.push({
							date: row[0],
							from: row[1],
							to: row[2],
							value: row[3],
						})
					})
					.on('end',  () => resolve(data))
					.on('error', (error: Error) => reject(error))
			})
			
		} catch (err) {
			throw err
		}
	}
}