import _ from 'lodash'

import run from './controller'
import { sleep } from '../tools'

const socket = require('./socketManager').socket;
const { MESSAGE_FROM_ECHO_SERVER } = require('./socketEvents');

import database from '../database'


// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'fr-FR';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
  singleUtterance: true,
};

const getStreamObj = (stream) => {
	const client = new speech.SpeechClient();
	return client
	  .streamingRecognize(request)
	  .on('error', console.error)
	  .on('data', async (data) => {
			if (data.results[0] && data.results[0].alternatives[0]) {

				const msg = data.results[0].alternatives[0].transcript
				const dataRun = await run(msg)
				database.message.create({ content: msg, conversationId: stream.currentConversation.id })

	        try {
	          socket.emit(MESSAGE_FROM_ECHO_SERVER, {
	            message: msg,
	            sender : stream.client.phoneNumber,
	            phoneNumber: stream.client.phoneNumber
	          });
	        } catch (err) {
	          console.log("The web server socket connection is not etablished, this is only an issue if you are using phone + web chat");
	        }

	        try {
	          socket.emit(MESSAGE_FROM_ECHO_SERVER, {
	            message: dataRun.answer,
	            sender : "Dolores",
	            phoneNumber: stream.client.phoneNumber
	          });
	        } catch (err) {
	          console.log("Unable to broadcast the answer to the web page. 'socket' might be undefined.");
	        }

			  try {
				  stream.answer(stream, dataRun.answer)
			  } catch (err) {
				  error(__filename, 'nexmoTTS', 'cant send talk message')
			  }
	  	}

      if (data.speechEventType === 'SPEECH_EVENT_UNSPECIFIED') {
		    stream.initiate(stream)

      } else if (data.speechEventType === 'END_OF_SINGLE_UTTERANCE') {
		  const id = stream.id
		  await sleep(1000)
		  stream.initiate(stream, id)
	  }
		}
	  )
}

// Create a recognize stream
const createStream = (stream, id = 0) => {
	if (id > 0 && stream.id > id) {
		return false
	}
	if (!_.isEmpty(stream.google)) {
		stream.google.destroy()
	}
	stream.id += 1
	stream.google = getStreamObj(stream)
	// console.log('*** Creating stream: ' + stream.id)
}

module.exports = createStream
