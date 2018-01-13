import _ from 'lodash'
import request from 'superagent'

import config from '../config'
import token from '../config/token'

import { errorMsg } from '../tools'

const lang = config.lang
const user = token.recast.user
const bot = token.recast.bot
const key = token.recast.token
const urlBot = `${config.url.recastApi}/users/${user}/bots/${bot}`
const urlRequest = `${config.url.recastApi}/request`

const analyse = data => {
	return new Promise((resolve, reject) => {
		request.post(`${urlRequest}`).set('Authorization', `Token ${key}`)
		.send({ text: data.message, language: lang })
		.end((err, res) => {
			if (err) {
				reject(errorMsg(__filename, 'analyse', 'error in recast api return'))
			} else {
				data.recast = res.body.results
				resolve(res.body.results)
			}
		})
	})
}

const getResponse = data => {
	getIntent(data)
	getPerson(data)
}

const getIntent = data => {
	data.intent = data.recast.intents && data.recast.intents[0] && data.recast.intents[0].slug || null
	data.context = data.intent && data.intent.split('-')[0] || null
	data.intent = data.intent && data.intent.replace('small-', '')
}

const getPerson = data => {
	if(!_.get(data.recast, 'entities.person[0]')) {
		return null
	}
	data.user.name = _.get(data.recast, 'entities.person[0]').fullname
}

module.exports = {
	analyse,
	getResponse,
}
