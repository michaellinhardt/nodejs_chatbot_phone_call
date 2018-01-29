
const packageStates = [
	'en cours de préparation',
	'en cours de chargement',
	'en transit',
	'arrivé au relai',
	'livré',
]

export default class PackagesContext {
	start (handler) {
		const function_name = 'start'
		try {
			this.db = handler.db
			this.brain = handler.brain

			this.brain.db.packages = { }

			global.warn(__filename, function_name, 'packages context ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async run () {
		try {
			this.brain.context = 'packages'
			this.brain.answer.index = 'packages'

			//this.brain.db.packages.trackingNumber = "123 456 789"

			if(this[this.brain.intent]) {
				await this[this.brain.intent]()
				return true
			}

			return false

		} catch (error) {
			global.err(__filename, 'run', error.stack)
		}
	}

	default (id) {
		try {

			console.log("PackagesContext : default called")

		} catch (error) {
			global.err(__filename, 'default', error.stack)
		}
	}

	async getdeliverystate () {
		const trackingNumber = this.brain.db.packages.trackingNumber

		if (trackingNumber) {
			this.brain.answer.label = 'package-state'
			const packageStateIndex = await this.db.packages.get_package_state(trackingNumber)

			this.brain.db.packages.packageState = packageStates[packageStateIndex]
		}
		else {
			this.brain.answer.label = 'ask-tracking-number'
			this.brain.db.packages.currentRequest = 'getdeliverystate'
		}
	}

	async settrackingnumber () {
		const entities = this.brain.entities
		const hasTrackingNumberBeenGiven = entities && entities['tracking-number'] && entities['tracking-number'][0]

		if (hasTrackingNumberBeenGiven) {
			const regexp = new RegExp(String.fromCharCode(160), 'g')
			const trackingNumber = (entities['tracking-number'][0].value).replace(regexp, String.fromCharCode(32))

			const isTrackingNumberValid = await this.db.packages.is_tracking_number_valid(trackingNumber)

			if (isTrackingNumberValid) {
				const currentRequest = this.brain.db.packages.currentRequest
				this.brain.db.packages.trackingNumber = trackingNumber

				if (this[currentRequest]) {
					await this[currentRequest]()
				}
			}
			else {
				this.brain.answer.label = 'invalid-tracking-number'
			}
		}
		else {
			this.brain.answer.label = 'no-tracking-number-detected'
		}
	}

}
