import { _log } from './config'

import {
	ExtendController,
	LogController,
	SequelizeController,
	ExpressController,
	NexmoController,
	SocketController,
} from './controller'

/*
** Class Dolores
** This is the Bot Server entry point (also know as app.js)
** This is a class who's call at the end of the file
** This class wake up everything to make the bot ready
**
*/

class Dolores extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start()
	** Initialise every part of the server
	*/
	async start () {
		const function_name = 'start()'
		try {
			this.init_controllers()
			await this.sequelize.start()
			this.express.start({ nexmo: this.nexmo })
			this.socket.start({ express: this.express })

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	/*
	** Method init_controller()
	** This method instantiate all controller needed for Dolores
	*/

	init_controllers () {
		const function_name = 'init_controller()'
		try {
			this.log = new LogController()
			this.sequelize = new SequelizeController()
			this.express = new ExpressController()
			this.nexmo = new NexmoController()
			this.socket = new SocketController()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}
}

// Start the bot ofc
(new Dolores()).start()
