import _ from 'lodash'

import answer from '../answer'

import ExtendController from './extend.controller'

/*
** Class AnswerController
*/
module.exports = class AnswerController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			this.brain = handler.brain
			this.nexmo = handler.nexmo

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method build
	*/
	async build () {
		const function_name = 'build()'
		try {
			this.get_answer()
			this.replace_answer()
			this.webchat_send_message(
				this.brain.nexmo.conversation_uuid,
				'Dolores',
				this.brain.answer.response,
			)
			this.nexmo.answer()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method get_answer
	*/
	get_answer () {
		const function_name = 'get_answer()'
		try {
			const index = this.brain.answer.index
			const label = this.brain.answer.label

			this.brain.answer.response = answer[index] && answer[index][label] || answer.small.default
			if (_.isEmpty(this.brain.answer.response)) {
				throw new Error(`cant find label '${label}' in index '${index}.js'`)
			}
			this.brain.answer.response = this.brain.answer.response[Math.floor(Math.random() * this.brain.answer.response.length)]

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method replace_answer
	*/
	replace_answer () {
		const function_name = 'replace_answer()'
		try {
			_.forEach(this.brain.answer.response.match(/\{(.*?)\}/g), (value) => {
				const strPathToData = value.replace('{', '').replace('}', '')
				const targetedData = _.get(this.brain.answer.data, strPathToData)
				this.brain.answer.response = this.brain.answer.response.replace(value, targetedData)
			})
		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
