/**-------------------------------------------------------------------------***
***--------------------------- Nexmo TTS API -------------------------------***
***-------------------------------------------------------------------------**/
import { errorMsg, sleep } from '../tools'

import _ from 'lodash';
import requestApi from 'superagent';
require('superagent-auth-bearer')(requestApi);

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '',
  apiSecret: '',
  applicationId: '',
  privateKey: './private.key',
});

const nexmoTTS = (stream, msg) => {
	return new Promise((resolve, reject) => {
		requestApi.put(`https://api.nexmo.com/v1/calls/${stream.client.uuid}/talk`)
		.authBearer(nexmo.generateJwt())
		// .set('Authorization', `Token ${key}`)
		.send({ text: msg, voice_name: 'Celine' })
		.end((err, res) => {
			if (err) {
				reject(errorMsg(__filename, 'nexmoTTS', 'cant send talk message'));
			} else {
				resolve(res.body.results);
			}
		})
	})
};

module.exports = nexmoTTS;
