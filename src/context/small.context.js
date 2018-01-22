import { small } from '../answer'

export default class SmallContext {
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain

			global.warn(__filename, function_name, 'small talk ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Class run
	** In this context, no logic. We just bind the intend and context matched
	** with the corresponding index and label in answer folder
	*/
	run () {
		try {
			const intent = this.brain.intent
			const context = this.brain.context

			if (small && small[intent]) {
				this.brain.answer.index = context
				this.brain.answer.label = intent
				return true
			}

			return false

		} catch (error) {
			global.err(__filename, 'run()', error.stack)
		}
	}

	/*
	** Class run
	** In this context, no logic. We just bind the intend and context matched
	** with the corresponding index and label in answer folder
	*/
	default () {
		try {
			return false

		} catch (error) {
			global.err(__filename, 'default()', error.stack)
		}
	}

}
