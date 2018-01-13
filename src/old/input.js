import _ from 'lodash'
import { error } from '../tools'

const verifyRequest = data => {
	if (_.isEmpty(data.message)) {
		error(__filename, 'verify', 'message is empty')
	}
}

module.exports = {
	verifyRequest,
}
