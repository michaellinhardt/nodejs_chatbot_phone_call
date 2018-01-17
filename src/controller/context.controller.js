import context from '../context'

import { _context } from '../config'

import ExtendController from './extend.controller'

/*
** Class ContextController
*/
module.exports = class ContextController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain
			this.answer = handler.answer

			this.brain.answer = { }
			this.brain.answer.index = _context.default.index
			this.brain.answer.label = _context.default.label

			this.load_context()
			this.start_context()

			global.info(__filename, function_name, 'context is ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method previous_context
	*/
	previous_context () {
		const function_name = 'previous_context()'
		try {
			// watch db result inside this.brain to find the last context
			// when find one, call it to see if he can resolve
			// repeat if not
			// not implemented yet

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method run
	*/
	run () {
		const function_name = 'run()'
		try {
			const context = this.brain.context

			if (this.context[context]) {
				this.context[context].run()

			} else {
				this.previous_context()
			}

			this.answer.build()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method start_context
	*/
	start_context () {
		const function_name = 'start_context()'
		try {
			this.handler = {
				brain: this.brain,
				db: this.db,
			}
			this.context.horairesalle.start(this.handler)
			this.context.small.start(this.handler)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method load_context
	*/
	load_context () {
		const function_name = 'load_context()'
		try {
			this.context = { }
			this.context.horairesalle = new context.HorairesalleContext()
			this.context.small = new context.SmallContext()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
