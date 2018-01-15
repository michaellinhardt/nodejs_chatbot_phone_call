import _ from 'lodash'

import { NexmoApi }  from '../api'
import { _nexmo } from '../config'

import ExtendController from './extend.controller'

/*
** Class NexmoController
** This controller handle incoming/outcoming message from Nexmo
*/
module.exports = class NexmoController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.api = new NexmoApi()
			this.brain = handler.brain

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method post_events
	** This method is call when Nexmo post data on road /nexmo/events
	*/
	post_events (request, response) {
		const function_name = 'post_events()'
		try {
			response.sendStatus(200)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method get_ncco
	** This method is call when Nexmo post data on road /nexmo/ncco
	** It send to nexmo the ncco config to connect with socket
	*/
	get_ncco (request, response) {
		const function_name = 'get_ncco()'
		try {
			this.ncco_url_data(request.url)
			this.ncco_save_data()

			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify(_nexmo), 'utf-8');
			global.info(__filename, function_name, `incoming call from: ${this.brain.nexmo.from}`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method ncco_url_data
	*/
	ncco_url_data (url) {
		const function_name = 'ncco_url_data()'
		try {
			this.brain.nexmo = { }
			_.forEach((url.split('?')[1]).split('&'), param => {
				this.brain.nexmo[(param.split('=')[0]).toLowerCase()] = param.split('=')[1]
			})
		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method ncco_save_data
	*/
	async ncco_save_data () {
		const function_name = 'ncco_save_data()'
		try {
			this.brain.db.user = await this.db.user.add(
				this.brain.nexmo.from,
			)
			this.brain.db.call = await this.db.call.add(
				this.brain.db.user.id,
				this.brain.nexmo.conversation_uuid,
			)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method answer
	*/
	async answer () {
		const function_name = 'answer()'
		try {
			this.db.message.add(
				this.brain.db.call.convId,
				this.brain.intent,
				this.brain.message,
				this.brain.answer,
			)
			console.log('-------------------------------------------')
			console.log(`User: ${this.brain.message}`)
			console.log(`Bot: ${this.brain.answer}`)
			console.log(`Intent: ${this.brain.intent}`)
			await this.api.talk(this.brain.nexmo.uuid, this.brain.answer)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
