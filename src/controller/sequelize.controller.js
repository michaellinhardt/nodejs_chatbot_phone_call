import Sequelize from 'sequelize'

import { _log, _sequelize } from '../config'

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
			this.operators_aliases()
			this.db = new Sequelize(_sequelize.database, _sequelize.username, _sequelize.password, { ..._sequelize, operatorsAliases: this.operatorsAliases })
			await this.db.authenticate()
			global.info(__filename, function_name, 'connection to database established')

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

		/*
		** Method operators_aliases
		** This is a security requierement by sequelize to prevent json object injection
		*/
		operators_aliases () {
			const function_name = 'method()'
			try {
				this.op = Sequelize.Op
				this.operatorsAliases = {}
			} catch (error) {
				global.err(__filename, function_name, error)
			}
		}

}
