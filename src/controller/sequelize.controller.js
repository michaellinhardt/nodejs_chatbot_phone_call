import { _log } from '../config'

import ExtendController from './extend.controller'

module.exports = class SequelizeController extends ExtendController {
	constructor () {
		super({ name: __filename })
		try {
			this.info(__filename, 'constructor()', `hello`)


		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: contructor()\r\n${_log.color.error}${error}\r\n${_log.color.clear}`)
		}
	}

}
