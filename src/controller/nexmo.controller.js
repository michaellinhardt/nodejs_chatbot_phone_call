import fs from 'fs'

import { _log, _nexmo } from '../config'

import ExtendController from './extend.controller'

/*
** Class NexmoController
** This controller handle incoming/outcoming message from Nexmo
*/
module.exports = class SequelizeController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method post_events
	** This method is call when Nexmo post data on road /nexmo/events
	*/
	post_events (request, response) {
		const function_name = 'post_events()'
		try {
			response.sendStatus(200)
			// global.info(__filename, function_name, 'nexmo send data to /nexmo/events')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method post_ncco
	** This method is call when Nexmo post data on road /nexmo/ncco
	** It send to nexmo the ncco config to connect with socket
	*/
	post_ncco (request, response) {
		const function_name = 'post_ncco()'
		try {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify(_nexmo), 'utf-8');
			global.info(__filename, function_name, 'sending ncco config to nexmo')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

}
