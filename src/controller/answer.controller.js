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
			this.brain.answer = answer[this.brain.context] && answer[this.brain.context][this.brain.intent]
			|| answer.small.default
			if (_.isEmpty(this.brain.answer)) {
				throw new Error(`cant find intent '${this.brain.intent}' in answer file '${this.brain.context}.js'`)
			}
			this.brain.answer = this.brain.answer[Math.floor(Math.random() * this.brain.answer.length)]

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
			_.forEach(this.brain.answer.match(/\{(.*?)\}/g), (value) => {
				const strPathToData = value.replace('{', '').replace('}', '')
				// const targetedData = _.get(data, strPathToData) -> pas de donnee a remplacer atm
				const targetedData = _.get({ }, strPathToData)
				this.brain.answer = this.brain.answer.replace(value, targetedData)
			})
		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
