import Sequelize from 'sequelize'

const MessageSchema = {
	convId: {
		type: Sequelize.STRING
	},
	intent: {
		type: Sequelize.TEXT,
	},
	message: {
		type: Sequelize.TEXT,
	},
	answer: {
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

	async add (convId, intent, message, answer) {
		try {
			const function_name = 'add()'
			await this.schema.create({
				convId: convId,
				intent: intent,
				message: message,
				answer: answer,
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
