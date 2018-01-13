import { _log } from '../config'

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
			global.info(__filename, function_name, 'Nexmo send data to /nexmo/events road')

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

	/*
	** Method post_ncco
	** This method is call when Nexmo post data on road /nexmo/ncco
	*/
	post_ncco (request, result) {
		const function_name = 'post_ncco()'
		try {
			global.info(__filename, function_name, 'Nexmo send data to /nexmo/ncco road')

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

}
