import Sequelize from 'sequelize'

const CallSchema = {
	finished: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	convId: {
		type: Sequelize.STRING
	},
}

export default class CallModel {
	start (sequelize) {
		const function_name = 'start()'
		try {
			this.schema = sequelize.db.define('calls', CallSchema)

			sequelize.user.schema.hasMany(this.schema, {as: 'calls'})
			this.schema.sync()
			sequelize.user.schema.sync()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async add (userId, conversation_uuid) {
		try {
			const function_name = 'add()'
			return (await this.schema.findOrCreate({
				where: {
					convId: conversation_uuid,
					userId: userId,
				},
				defaults: {},
			}))[0].dataValues

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async close (id) {
		try {
			const function_name = 'close()'
			await this.schema.update({ finished: true }, { where: { id: id } })

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
