import { recast }  from '../api'
import { _recast } from '../config'

import ExtendController from './extend.controller'

/*
** Class RecastController
** This controller handle incoming/outcoming message from Nexmo
*/
module.exports = class RecastController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			const token = { ..._recast.token.dolores_demo }
			this.api = new recast(token.user, token.bot, token.token)

			this.brain = handler.brain

			global.info(__filename, function_name, 'setting up recast api')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method analyse
	** send user message to Recast.AI NLP
	*/
	async analyse (message) {
		const function_name = 'analyse()'
		try {
			const result = await this.api.analyse(message)
			this.brain.analyse(result)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
