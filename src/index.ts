import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

const envPath: string = path.join(__dirname, '../.env')
dotenv.config({ path: envPath })

import App from './app'
import config from './config'
import { TestController } from './controllers'

const app = new App({
	port: config.PORT,
	controllers: [
		new TestController()
	],
	middlewares: [
		cors({
			origin: config.ORIGIN,
			credentials: config.CREDENTIALS
		}),
		helmet(),
		compression(),
		express.json({ limit: '50mb' }),
		express.urlencoded({ extended: true })
	]
})

app.listen()