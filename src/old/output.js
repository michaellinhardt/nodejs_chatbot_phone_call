import _ from 'lodash'
import { error, json, randomArr } from '../tools'

import answer from '../answer'

const getAnswer = data => {
	data.answer = answer[data.context] && answer[data.context][data.intent] || answer.small.default
	if (_.isEmpty(data.answer)) {
		throw new Error(error(__filename, 'getAnswer', `cant find intent '${data.intent}' in answer file '${data.context}.js'`))
	}
	data.answer = randomArr(data.answer)
}

const answerReplace = data => {
	_.forEach(data.answer.match(/\{(.*?)\}/g), (value) => {
		const strPathToData = value.replace('{', '').replace('}', '')
		const targetedData = _.get(data, strPathToData)
		data.answer = data.answer.replace(value, targetedData)
	})
}

const saveLast = data => {
	data.lastAnswer = data.answer || answer.small["cant-repeat"]
}

module.exports = {
	getAnswer,
	answerReplace,
	saveLast,
}
