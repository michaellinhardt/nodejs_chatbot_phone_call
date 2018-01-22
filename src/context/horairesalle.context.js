export default class HorairesalleContext {
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain

			global.warn(__filename, function_name, 'horaire salle de sport ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	run () {
		try {
			const intent = this.brain.intent
			const context = this.brain.context

			// pour l'instant elle redirige betement

			this.brain.answer.index = context
			this.brain.answer.label = intent

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

}
