import { _log } from '../config'

import ExtendController from './extend.controller'

/*
** Class SocketController
** This controller start socket server and redirect incoming event
** To the dedicated controller
*/
module.exports = class SequelizeController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start ()
	** This method start the socket server
	*/
	async start () {
		const function_name = 'start()'
		try {
			global.info(__filename, function_name, 'socket server ready')

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}
}
