export default class WelcomeContext {
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain

			global.warn(__filename, function_name, 'welcome ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	run () {
		try {
			this.brain.answer.index = 'welcome'
			this.brain.answer.label = 'default'

			if (this[this.brain.intent]) {
				return this[this.brain.intent]()
			}

			return false

		} catch (error) {
			global.err(__filename, 'run()', error.stack)
		}
	}

	async default (id) {
		console.log('welcome default called')
		try {
			const messages = this.brain.db.messages || []
			const user = this.brain.db.user

			if (user && !user.firstName && (await this.prenom())) {
				this.brain.answer.index = 'welcome'
				return true

			} else if (user.firstName && messages.length === 0) {
				this.brain.answer.index = 'welcome'
				this.brain.answer.label = 'default-prenom'
				return true
			}

			return false

		} catch (error) {
			global.err(__filename, 'default', error.stack)
		}
	}

	async prenom () {
		const function_name = 'prenom()'
		try {
			const messages = this.brain.db.messages || []
			const entities = this.brain.entities || null

			if (messages && messages.length === 0) {
				this.brain.answer.label = 'prenom'
				this.brain.intent = 'prenom'
				return true

			} else if (messages && messages.length < 3
				&& entities && entities.person && entities.person[0]
				&& entities.person[0].fullname) {
					this.brain.answer.label = 'prenom-validate'
					this.brain.intent = 'prenom-validate'
					this.brain.db.user.firstName = entities.person[0].fullname
					await this.db.user.addPrenom(entities.person[0].fullname)
					return true
				}
				return false

			} catch (error) {
				global.err(__filename, function_name, error)
			}
		}
	}
