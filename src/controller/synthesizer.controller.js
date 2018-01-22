import googletts from 'google-tts-api'
import mpc from 'node-mpv'

import { _synthesizer } from '../config'

import ExtendController from './extend.controller'

/*
** Class SynthesizerController
** This controller handle incoming/outcoming message from Nexmo
*/
module.exports = class SynthesizerController extends ExtendController {
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
			this.db = handler.db

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async talk(message) {
		await this.google_tts(message)
		await this.talk_mpv()
	}

	async talk_mpv() {
		const player = new mpc()
		const play = await player.load(this.url)
	}

	async google_tts(message) {
		this.url = await googletts(message, 'fr', 1)
	}
}
