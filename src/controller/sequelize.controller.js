import Sequelize from 'sequelize'

import { _log, _sequelize } from '../config'

import {
	CallModel,
	ConversationModel,
	MessageModel,
	UserModel,
} from '../model'


import ExtendController from './extend.controller'

/*
** Class SequelizeController
** This controller is here to connect database
** This controller also load and give table models
*/
module.exports = class SequelizeController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start ()
	** This method connect sequelize to the db
	** This is async because we wait to be connected before continue
	*/
	async start () {
		const function_name = 'start()'
		try {
			this.db = new Sequelize(_sequelize.database, _sequelize.username, _sequelize.password, { ..._sequelize, operatorsAliases: this.operators_aliases })
			await this.db.authenticate()
			this.init_table()
			global.info(__filename, function_name, 'connection to mysql established')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

		/*
		** Method init_table
		*/
		init_table () {
			const function_name = 'init_table()'
			try {
				this.call = new CallModel()
				this.message = new MessageModel()
				this.user = new UserModel()

				this.user.start(this)
				this.call.start(this)
				this.message.start(this)

			} catch (error) {
				global.err(__filename, function_name, error.stack)
			}
		}

	/*
	** Method operators_aliases
	** This is a security requierement by sequelize to prevent json object injection
	** Actually we dont really use it and we should do it later this is important
	*/
	operators_aliases () {
		const function_name = 'operators_aliases()'
		try {
			this.op = Sequelize.Op
			return {}

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

}
