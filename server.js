const express = require('express')
const next = require('next')
// const { createProxyMiddleware } = require('http-proxy-middleware')
// const { parse } = require('url')
require('dotenv').config({ path: './.env.production' })
const port = process.env.PORT || 8080
const isDev = false //always be production
// console.log('Process.env is' + process.env.NODE_ENV)
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
// server.use(express.static(__dirname + '/.next/static'))
app
	.prepare()
	.then(() => {
		const server = express()
		// Express server handlers
		// server.get('/calendar', (req, res) => {
		// 	const queryParams = { slug: 1, apiRoute: 'page' }
		// 	app.render(req, res, '/', queryParams)
		// })
		// Fallback handler
		server.get('*', (req, res) => {
			return handle(req, res)
		})
		server.listen(port, (err) => {
			if (err) throw err
			console.log(`> Next.js is running on http://localhost:${port}`)
		})
	})
	.catch((err) => {
		console.log('Error:::::', err)
	})
