export default class RedirectContext {
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain

			global.warn(__filename, function_name, 'redirection operateur ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	run () {
		try {
			this.brain.context = 'redirect'
			this.brain.answer.index = 'redirect'

			if (!this.brain.db.redirect) {
				this.brain.db.redirect = { }
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


			this.brain.answer.label = 'default'
			console.log(`id: ${id}`)

			if (messages[id].intent === 'buy' && entities && entities.datetime
			&& entities.datetime[0] && entities.datetime[0].iso) {
				console.log('this.gethoraires()')
				return true

			} else if (messages[id].intent === 'probleme'
			&& (this.brain.intent === 'oui' || this.brain.intent === 'non')
			&& id < 3) {
				console.log('this.inscrire_reponse()')
				return true
			}

			return false

		} catch (error) {
			global.err(__filename, 'default', error.stack)
		}
	}

	problem () {
		try {

			if (this.brain.entities.box && !this.brain.entities.telephone)
			{
				this.brain.db.redirect.box = true,
				this.brain.answer.label = 'redirectToBoxProblem'
			}
			else if (this.brain.entities.telephone && !this.brain.entities.box)
			{
				this.brain.db.redirect.telephone = true,
				this.brain.answer.label = 'redirectToTelephoneProblem'

			}
			else {
				this.brain.answer.label = 'getProblemType'
			}
		} catch (error) {
			global.err(__filename, 'problem', error.stack)
		}
	}

		buy () {
			try {

				if (this.brain.entities.box && !this.brain.entities.telephone)
				{
					this.brain.db.redirect.box = true,
					this.brain.answer.label = 'redirectToBoxBuy'
				}
				else if (this.brain.entities.telephone && !this.brain.entities.box)
				{
					this.brain.db.redirect.telephone = true,
					this.brain.answer.label = 'redirectToTelephoneBuy'

				}
				else {
					this.brain.answer.label = 'getBuyType'
				}
			} catch (error) {
				global.err(__filename, 'buy', error.stack)
			}
		}
	}
