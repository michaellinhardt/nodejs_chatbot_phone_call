import _ from 'lodash'
import Sequelize from 'sequelize'

const PackageSchema = {
	userID: {
		type: Sequelize.TINYINT,
		allowNull: false,
	},
	trackingNumber: {
		type: Sequelize.STRING,
	},
	state: {
		type: Sequelize.TINYINT
	},
	address: {
		type: Sequelize.STRING
	}
}

export default class PackageModel {
	async start (handler) {
		const function_name = 'start'
		try {
			this.brain = handler.brain
			this.schema = handler.db.define('package', PackageSchema)

			await this.schema.sync()
			await this.schema.findOrCreate({
				where: {
					userID: 0,
					trackingNumber: "123 456 789",
					state: 1,
					address: "34 rue Mathilde",
				},
				defaults: {},
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async get_package_state (trackingNumber) {
		try {
			const packageState = (await this.schema.find({
				where: {
					trackingNumber: trackingNumber,
				},
			})).dataValues.state

			return (packageState)

		} catch (error) {
			global.err(__filename, 'get_package_state', error.stack)
		}
	}

	async get_delivery_location (trackingNumber) {
		try {
			const deliveryLocation = (await this.schema.find({
				where: {
					trackingNumber: trackingNumber,
				},
			})).dataValues.address

			return (deliveryLocation)

		} catch (error) {
			global.err(__filename, 'get_delivery_location', error.stack)
		}
	}

	async is_tracking_number_valid (trackingNumber) {
		try {
			const packageState = (await this.schema.find({
				where: {
					trackingNumber: trackingNumber,
				},
			}))

			const result = (packageState === null) ? false : true
			return (result)

		} catch (error) {
			global.err(__filename, 'is_tracking_number_valid', error.stack)
		}
	}
}
