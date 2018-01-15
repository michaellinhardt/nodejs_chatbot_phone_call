import Sequelize from 'sequelize'

const MessageSchema = {
	convId: {
		type: Sequelize.STRING
	},
	from: {
		type: Sequelize.TEXT,
	},
	intent: {
		type: Sequelize.TEXT,
	},
	message: {
		type: Sequelize.TEXT,
	},
}

export default class MessageModel {
	start (sequelize) {
		const function_name = 'start()'
		try {
			this.schema = sequelize.db.define('message', MessageSchema)
			this.schema.hasMany(this.schema, {as: 'messages'})
			this.schema.sync()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async add (convId, from, intent, message) {
		try {
			const function_name = 'add()'
			await this.schema.create({
				convId: convId,
				from: from,
				intent: intent,
				message: message,
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
