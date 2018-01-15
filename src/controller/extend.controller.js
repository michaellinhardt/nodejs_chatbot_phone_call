import path from 'path'

import {
	_log,
} from '../config/'

/*
** Class Extend
** This code is inside every other Controller Class
** It bring methot that they all need like seting the class name for log
** enabling or not the log output
*/
module.exports = class ExtendController {
	constructor (param) {
		try {
			this.info = global.info || null

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: constructor()\r\n${_log.color.error}${error.stack}\r\n${_log.color.clear}`)
		}
	}

	/*
	** Method path_to_index
	** Set the currently instencied class name as an usable index
	*/
	path_to_index (filename) {
		const name = path.basename(filename).replace('.js', '').split('.')
		const lastName = name[name.length - 1]
		return `${lastName}_${name.join('_').replace(`_${lastName}`, '')}`
	}

}
