import ExtendController from './extend.controller'

/*
** Class AnswerController
*/
module.exports = class AnswerController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start () {
		const function_name = 'start()'
		try {

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method build
	*/
	async build (brain) {
		const function_name = 'build()'
		try {
			console.log(`intent: ${brain.intent}, context: ${brain.context}`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
