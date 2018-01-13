import { _log } from './config'

import {
	ExtendController,
	LogController,
	SequelizeController,
} from './controller'

class Dolores extends ExtendController {
	constructor () { super({ name: __filename }) }

	start () {
		const function_name = 'start()'
		try {
			this.init_controllers()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error}\r\n${_log.color.clear}`)
		}
	}

	init_controllers () {
		const function_name = 'init_controller()'
		try {
			this.log = new LogController()
			this.sequelize = new SequelizeController()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error}\r\n${_log.color.clear}`)
		}
	}
}

// Start the bot ofc
(new Dolores()).start()
