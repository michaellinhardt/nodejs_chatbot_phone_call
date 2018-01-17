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
			this.brain.context = 'horairesalle'
			this.brain.answer.index = 'horairesalle'

			if (!this.brain.answer.data.horairesalle) {
				this.brain.answer.data.horairesalle = { }
			}


			if (this[this.brain.intent]) {
				this[this.brain.intent]()
				return true

			}

			return false

		} catch (error) {
			global.err(__filename, 'run()', error.stack)
		}
	}

	default (id) {
		try {
			const messages = this.brain.db.messages
			const entities = this.brain.entities

			if (messages[id].intent === 'gethoraires' && entities.datetime
			&& entities.datetime[0] && entities.datetime[0].iso) {
				this.gethoraires()
				return true
			} else if (messages[id].intent === 'inscrire'
			&& (this.brain.intent === 'oui' || this.brain.intent === 'non')
			&& id < 3) {
				this.inscrire_reponse()
				return true
			}

			return false

		} catch (error) {
			global.err(__filename, 'default', error.stack)
		}
	}

	gethoraires () {
		try {
			const planning = this.db.horairesalle.planning

			this.gethoraires_datetime()

			this.brain.answer.data.horairesalle.day = planning[this.dayId].day

			if (!planning[this.dayId].start) {
				this.brain.answer.label = 'gethoraires-close'

			} else {
				this.brain.answer.label = 'gethoraires-open'
				this.brain.answer.data.horairesalle.start = planning[this.dayId].start
				this.brain.answer.data.horairesalle.end = planning[this.dayId].end
			}

		} catch (error) {
			global.err(__filename, 'gethoraires', error.stack)
		}
	}

	inscrire () {
		try {
			this.brain.answer.label = 'inscrire-ask'

		} catch (error) {
			global.err(__filename, 'gethoraires', error.stack)
		}
	}

	inscrire_reponse () {
		try {
			if (this.brain.intent === 'oui') {
				this.brain.answer.label = 'inscrire-employe'

			} else {
				this.brain.answer.label = 'inscrire-autre'
			}

		} catch (error) {
			global.err(__filename, 'gethoraires', error.stack)
		}
	}

	gethoraires_datetime () {
		try {
			const entities = this.brain.entities

			if (entities.datetime && entities.datetime[0] && entities.datetime[0].iso) {
				this.dayId = (new Date(entities.datetime[0].iso)).getDay()

			} else {
				this.dayId = (new Date).getDay()
			}

		} catch (error) {
			global.err(__filename, 'gethoraires', error.stack)
		}
	}
}
