import fs from 'fs'

import { nexmo }  from '../api'

import { _log, _nexmo } from '../config'

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
			this.api = new nexmo()

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
			// global.info(__filename, function_name, 'nexmo send data to /nexmo/events')

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
			this.get_uuid(request)

			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify(_nexmo), 'utf-8');
			global.info(__filename, function_name, 'sending ncco config to nexmo')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method answer
	*/
	answer () {
		const function_name = 'answer()'
		try {
			this.api.talk(this.brain.client, this.brain.answer)
			console.log('-------------------------------------------')
			console.log(`User: ${this.brain.message}`)
			console.log(`Bot: ${this.brain.answer}`)
			console.log(`Intent: ${this.brain.intent}`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method get_uuid
	** This method is call when Nexmo post data on road /nexmo/events
	*/
	get_uuid (request) {
		const function_name = 'get_uuid()'
		try {
			if (request.url.split('&uuid=')[1]) {
				this.brain.client = request.url.split('&uuid=')[1]
			}

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

}
