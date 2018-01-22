import speech from '@google-cloud/speech'
import record from 'node-record-lpcm16'

import { _micro } from '../config'

import ExtendController from './extend.controller'

/*
** Class Controller
** This controller handle incoming/outcoming message from Nexmo
*/
module.exports = class MicroController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method .
	** Description
	**
	** object Name: description
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			this.brain = handler.brain
			this.google = handler.google
			this.fill_brain()
			this.record = record
			this.google.new_stream()
			this.start_record()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method .
	** Description
	**
	** object Name: description
	*/
	start_record () {
		const function_name = 'start_record()'
		try {
			this.record
			.start(_micro.stream)
			.on('error', console.error)
			.pipe(this.google.stream)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
	/*
	** Method fill_brain
	** Description
	**
	** object Name: description
	*/
	fill_brain () {
		const function_name = 'fill_brain()'
		try {
			this.brain.nexmo = _micro.fill.nexmo
			this.brain.db = _micro.fill.db

			const randomConvId = `${this.brain.nexmo.conversation_uuid}-${Math.floor(Math.random() * 999999) + 1000000}`
			this.brain.nexmo.conversation_uuid = randomConvId
			this.brain.db.call.convId = randomConvId

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
