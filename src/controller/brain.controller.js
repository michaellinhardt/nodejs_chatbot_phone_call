import ExtendController from './extend.controller'

/*
** Class BrainController
*/
module.exports = class BrainController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			this.answer = handler.answer

			global.info(__filename, function_name, 'setting up recast api')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method analyse
	** parse return from recast nlp
	*/
	async analyse (result) {
		const function_name = 'analyse()'
		try {
			this.intent = result.intents && result.intents[0] && result.intents[0].slug || null
			this.context = this.intent && this.intent.split('-')[0] || null
			this.intent = this.intent && this.intent.replace('small-', '')

			this.answer.build({
				intent: this.intent,
				context: this.context,
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
