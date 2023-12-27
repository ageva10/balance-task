import App from './app'
import express from 'express'

import { TestController } from './controllers'

const app = new App({
	port: 3000,
	controllers: [
		new TestController()
	],
	middlewares: [
		express.json({ limit: '50mb' }),
		express.urlencoded({ extended: true })
	]
})

app.listen()