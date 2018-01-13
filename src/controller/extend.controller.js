import path from 'path'

import {
	_log,
} from '../config/'

module.exports = class ExtendController {
	constructor (param) {
		try {
			this.set_config(param)

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: constructor()\r\n${_log.color.error}${error}\r\n${_log.color.clear}`)
		}
	}

	set_config (param) {
		try {
			this.name = this.path_to_index(param.name) || 'unknow'

		} catch (error) {
			process.stdout.write(`${_log.color.filename}${this.path_to_index(__filename)}${_log.color.warn}: set_config()\r\n${_log.color.error}${error}\r\n${_log.color.clear}`)
		}
	}

	path_to_index (filename) {
		const name = path.basename(filename).replace('.js', '').split('.')
		const lastName = name[name.length - 1]
		return `${lastName}_${name.join('_').replace(`_${lastName}`, '')}`
	}

}
