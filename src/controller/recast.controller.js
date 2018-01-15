import { RecastApi }  from '../api'
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
			this.api = new RecastApi(token.user, token.bot, token.token)

			this.answer = handler.answer
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
			this.brain.result = await this.api.analyse(this.brain.message)
			this.brain.intent = this.brain.result.intents && this.brain.result.intents[0] && this.brain.result.intents[0].slug || null
			this.brain.context = this.brain.intent && this.brain.intent.split('-')[0] || null
			this.brain.intent = this.brain.intent && this.brain.intent.replace('small-', '')

			this.answer.build()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
