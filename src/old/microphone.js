import _ from 'lodash'
import requestApi from 'superagent'
require('superagent-auth-bearer')(requestApi)

import { json } from '../tools'
import { answer } from './synthesizer'

const createStream = require('./recognition.js')
const stream = {
	id: 0,
	initiate: (stream, id = 0) => createStream(stream, id),
	answer: (stream, msg) => answer(stream, msg),
	record: require('node-record-lpcm16'),
}
stream.initiate(stream, 0)

stream.record
  .start({
    sampleRateHertz: 16000,
    threshold: 0,
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
	// thresholdStart: '1.0',	// silence threshold to start recording, overrides threshold (rec only)
	// thresholdEnd  : '2.0',	// silence threshold to end recording, overrides threshold (rec only)
	// silence       : '2.0'	// seconds of silence before ending
  })
  .on('error', console.error)
  .pipe(stream.google)

console.log('Listening, press Ctrl+C to stop.');
