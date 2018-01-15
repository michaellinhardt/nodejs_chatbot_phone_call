import nexmo from 'nexmo'
import request from 'superagent'
require('superagent-auth-bearer')(request)

import { _nexmoapi } from '../config'

export default class NexmoApi {
	constructor (user, bot, token) {
		this.nexmo = new nexmo(_nexmoapi.token)
	}

	talk (client, message) {
		return new Promise((resolve, reject) => {
			request.put(`${_nexmoapi.url}/calls/${client}/talk`)
			.authBearer(this.nexmo.generateJwt())
			.send({ text: message, voice_name: _nexmoapi.voice })
			.end((err, res) => {
				if (err) {
					reject(err)
				} else {
					resolve(res.body.results)
				}
			})
		})
	}
}
