import { IConfig } from './interfaces'

const config: IConfig = {
	NODE_ENV: process.env.NODE_ENV!,
	PORT: Number(process.env.PORT),
	ORIGIN: ['http://localhost:3000', process.env.ORIGIN!],
	CREDENTIALS: process.env.CREDENTIALS === 'true'
}

export default config