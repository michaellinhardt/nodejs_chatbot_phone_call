import winston from 'winston'
import prettyjson from 'prettyjson'
import fs from 'fs'

import { _log } from '../config'

import ExtendController from './extend.controller'

module.exports = class LogController extends ExtendController {
	constructor () {
		super({ name: __filename })
		try {
			this.init_winston()
			this.init_log_functions()

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: contructor()\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	init_log_functions () {
		if (_log.terminal !== true) {
			this.globals_disable()

		} else {
			this.globals_enable()
		}
		global.err = (filename, functionn, error) => {
			this.logger.error(`${_log.color.filename}${this.path_to_index(filename)}.${functionn}, ${_log.color.error}${error}${_log.color.clear}`)
		}
	}

	globals_enable () {
		try {
			global.log = (logMessage) => {
				process.stdout.write(`${_log.color.message}${logMessage}\r\n${_log.color.clear}`)
			}
			global.info = (filename, functionn, logMessage) => {
				this.logger.info(`${_log.color.filename}${this.path_to_index(filename)}.${functionn}, ${_log.color.info}${logMessage}${_log.color.clear}`)
			}
			global.warn = (filename, functionn, logMessage) => {
				this.logger.warn(`${_log.color.filename}${this.path_to_index(filename)}.${functionn}, ${_log.color.warn}${logMessage}${_log.color.clear}`)
			}
			global.json = (logObject) => {
				process.stdout.write(`${prettyjson.render(logObject)}\r\n${_log.color.clear}`)
			}
			global.info(__filename, 'globals_enable()', 'load log methods in globals')

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: globals_enable()\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	globals_disable () {
		try {

			global.log = () => false
			global.info = () => false
			global.err = () => false
			global.warn = () => false
			global.json = () => false

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: globals_disable()\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	init_winston () {
		try {

			const env = (process.env.NODE_ENV || 'development')
			const logDir = _log.folder

			// Create the log directory if it does not exist
			if (!fs.existsSync(logDir)) { fs.mkdirSync(logDir) }

			const timestampFormat = () => (new Date()).toLocaleTimeString()

			const transport_console = {
				timestamp: timestampFormat,
				colorize: true,
				prettyPrint: true,
				silent: false,
				level: 'info',
			}

			const transport_file = {
				filename: `${logDir}/-results.log`,
				timestamp: timestampFormat,
				datePattern: 'yyyy-MM-dd',
				prepend: true,
				level: env === 'development' ? 'verbose' : 'info',
			}
			this.logger = new (winston.Logger)({
				transports: [

					// colorize the output to the console
					new (winston.transports.Console)(transport_console),
					new (require('winston-daily-rotate-file'))(transport_file),
				],
			})

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: init_winston()\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}
}
