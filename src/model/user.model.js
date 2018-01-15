import Sequelize from 'sequelize'

const UserSchema = {
	phoneNumber: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	}
}

export default class UserModel {
	start (sequelize) {
		const function_name = 'start()'
		try {
			this.schema = sequelize.db.define('user', UserSchema)
			this.schema.sync()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async add (phoneNumber) {
		try {
			const function_name = 'add()'
			return (await this.schema.findOrCreate({
				where: {
					phoneNumber: phoneNumber,
				},
				defaults: {},
			}))[0].dataValues

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
