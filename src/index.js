import { _log, _micro } from './config'

import controllers from './controller'


/*
** Class Dolores
** This is the Bot Server entry point (also know as app.js)
** This is a class who's call at the end of the file
** This class wake up everything to make the bot ready
**
*/

class Dolores extends controllers.ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start()
	** Initialise every part of the server
	*/
	async start () {
		const function_name = 'start()'
		try {
			this.load_controller()
			await this.start_controller()
			this.link_controller()

			this.express.listen()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	/*
	** Method link_controller()
	** Link some controller method to external controller method
	*/

	link_controller () {
		const function_name = 'link_controller()'
		try {
			this.google.webchat_send_message = this.socket.webchat_send_message.bind(this.socket)
			this.answer.webchat_send_message = this.socket.webchat_send_message.bind(this.socket)
			this.nexmo.webchat_newcall = this.socket.webchat_newcall.bind(this.socket)

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	/*
	** Method start_controller()
	** This method instantiate all controller needed for Dolores
	*/

	async start_controller () {
		const function_name = 'start_controller()'
		try {
			const brain = { db: { } }
			await this.sequelize.start()
			this.nexmo.start({ brain, db: this.sequelize })
			this.answer.start({ brain, nexmo: this.nexmo })
			this.context.start({ brain, db: this.sequelize, answer: this.answer })
			this.recast.start({ brain, context: this.context, answer: this.answer })
			this.google.start({ brain, recast: this.recast })
			this.express.start({ nexmo: this.nexmo })
			if (_micro.enable) {
				this.nexmo.api.talk = () => true
				this.micro.start({ brain, google: this.google })
			}
			this.socket.start({
				brain,
				express: this.express,
				google: this.google,
				db: this.sequelize,
			})

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	/*
	** Method load_controller()
	** This method instantiate all controller needed for Dolores
	*/

	load_controller () {
		const function_name = 'load_controller()'
		try {
			this.log = new controllers.LogController()
			this.sequelize = new controllers.SequelizeController()
			this.express = new controllers.ExpressController()
			this.nexmo = new controllers.NexmoController()
			this.socket = new controllers.SocketController()
			this.google = new controllers.GoogleController()
			this.recast = new controllers.RecastController()
			this.answer = new controllers.AnswerController()
			this.micro = new controllers.MicroController()
			this.context = new controllers.ContextController()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: ${function_name}\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}
}

// Start the bot ofc
(new Dolores()).start()
