import express from 'express'
import http from  'http'

import { _log, _express } from '../config'

import ExtendController from './extend.controller'

/*
** Class ExpressController
** This controller handle all the http server input
**
** object parent: Contain access to all the app object
*/
module.exports = class ExpressController extends ExtendController {
	constructor (parent) { super({ name: __filename }) }

	/*
	** Method init ()
	** This method run http server and road to listen
	*/
	async init (handler) {
		const function_name = 'init()'
		try {
			this.init_config()
			this.init_roads(handler)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method init_config()
	** This methods set the server config
	*/
	init_config () {
		const function_name = 'init_config()'
		try {
			this.express = express()
			this.server = http.createServer(this.express)
			global.info(__filename, function_name, 'express server is setting up')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method init_roads()
	** This methods open one by one each roads that we need to listen
	** It create bridge beetwen the incoming message to the dedicated controller/method
	*/
	init_roads (handler) {
		const function_name = 'init_roads()'
		try {
			this.express.post('/nexmo/events', handler.nexmo.post_events)
			this.express.get('/nexmo/ncco', handler.nexmo.post_ncco)

			global.info(__filename, function_name, 'roads bridge are setting up')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}


	/*
	** Method listen()
	** This method start the server according to the setting previously set
	*/
	async listen () {
		const function_name = 'listen()'
		try {
			await this.server.listen(_express.port)
			global.info(__filename, function_name, 'express is now listening roads')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

}
