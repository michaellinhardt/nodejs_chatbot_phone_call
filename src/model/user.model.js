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
	start (handler) {
		const function_name = 'start()'
		try {
			this.brain = handler.brain
			this.schema = handler.db.define('user', UserSchema)
			this.schema.sync()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async add (phoneNumber) {
		const function_name = 'add()'
		try {
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
	
	async addPrenom (prenom) {
		const function_name = 'add()'
		try {
			return (await this.schema.update(
				{ firstName: prenom },
				{	where: { phoneNumber: this.brain.db.user.phoneNumber } }
			))

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
