import express from 'express'
import bodyParser from 'body-parser'

import { _log, _express } from '../config'

import ExtendController from './extend.controller'

/*
** Class ExpressController
** This controller handle all the http server input
*/
module.exports = class ExpressController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start ()
	** This method run http server and road to listen
	*/
	async start () {
		const function_name = 'start()'
		try {
			this.server = express()
			this.server.set('port', _express.port)
			global.info(__filename, function_name, 'express server is ready')

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}
}
