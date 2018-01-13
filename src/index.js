import { _log } from './config'

import {
	ExtendController,
	LogController,
	SequelizeController,
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
	** - init_controller():
	**   -  load all controller constructor method in the right place
	*/
	start () {
		const function_name = 'start()'
		try {
			this.init_controllers()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error}\r\n${_log.color.clear}`)
		}
	}

	/*
	** Method init_controller()
	** load all controller constructor
	**
	** this.log is controlling the log ouput (file and terminal)
	** this.sequelize is controlling the database interaction
	*/

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
