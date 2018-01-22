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
	start (handler) {
		const function_name = 'start()'
		try {
			this.brain = handler.brain
			this.schema = handler.db.define('message', MessageSchema)
			this.schema.hasMany(this.schema, {as: 'messages'})
			this.schema.sync()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
	
	async add (brain) {
		try {
			const function_name = 'add()'
			await this.schema.create({
				convId: brain.nexmo.conversation_uuid,
				from: 'user',
				intent: `${brain.context}/${brain.intent}`,
				message: brain.message,
			})
			this.schema.create({
				convId: brain.nexmo.conversation_uuid,
				from: 'bot',
				intent: `${brain.answer.index}/${brain.answer.label}`,
				message: brain.answer.response,
			})

		} catch (error) {
			global.err(__filename, 'add()', error.stack)
		}
	}
}
