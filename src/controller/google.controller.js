import speech from '@google-cloud/speech'

import { _google } from '../config'

import ExtendController from './extend.controller'

/*
** Class GoogleController
** This controller manage stream with google
*/
module.exports = class GoogleController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start
	*/
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain
			this.recast = handler.recast
			global.info(__filename, function_name, 'setting up recast api')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method write ()
	** This method is a wrapper to the write method from google SDK
	** It reset the stream if expire time is reached or create it
	** If not exist
	*/
	async write (data) {
		const function_name = 'write()'
		try {
			if (!this.stream || (Date.now() / 1000) > this.streamExpire) {
				this.clear_stream()
				await this.new_stream()
			}
			this.stream.write(data)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method clear_stream ()
	*/
	clear_stream () {
		const function_name = 'clear_stream()'
		try {
			if (this.stream) {
				this.stream.destroy()
			}
			this.stream = null
			this.client = null

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method get_data ()
	*/
	get_data (data) {
		const function_name = 'get_data()'
		try {
			const message = (data.results[0] && data.results[0].alternatives[0]
				&& data.results[0].alternatives[0].transcript) || null

				if (message) {

					this.brain.message = message
					this.db.message.add(
						this.brain.nexmo.conversation_uuid,
						'user',
						this.brain.intent,
						this.brain.message,
					)

					this.recast.analyse()

					// this.stream.destroy()
					// this.stream = null
					// this.client = null
				}

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method new_stream ()
	*/
	async new_stream () {
		const function_name = 'new_stream()'
		try {
			this.client = new speech.SpeechClient()

			this.streamExpire = (Date.now() / 1000) + _google.expirationTime
			this.stream = this.client
			.streamingRecognize(_google)
			.on('error', (error) => global.err(__filename, function_name, error.stack))
			.on('data', (data) => this.get_data(data))

			// global.info(__filename, function_name, 'create a stream google')

			} catch (error) {
				global.err(__filename, function_name, error.stack)
			}
		}
	}
