import io from 'socket.io-client';

const nexmoTTS = require('./nexmotts');
const { NEW_CALL } = require('./socketEvents');

const webPageURL = 'http://localhost:8888';
const socket = module.exports.socket = io(webPageURL);

/**-------------------------------------------------------------------------***
***------------------------ Stream Initialization --------------------------***
***-------------------------------------------------------------------------**/

const createStream = require('./recognition.js');
const stream = {
	id: 0,
	initiate: (stream, id = 0) => createStream(stream, id),
	answer: (stream, msg) => nexmoTTS(stream, msg),
}
stream.initiate(stream);

function connectPhoneServerWithWebServer() {
  socket.on('connect', () => {
    console.log("Servers are connected");
  });
}

function webSocketManager(connection) {
  console.log((new Date()) + ' Connection accepted' + ' - Protocol Version ' + connection.webSocketVersion);
	socket.emit(NEW_CALL, stream.client.phoneNumber);
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          console.log("Text message: " + message.utf8Data);
      }
      else if (message.type === 'binary') {
          stream.google.write(message.binaryData);
          //connection.sendBytes(message.binaryData);
      }
  });
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
}

module.exports = {
  stream,
  connectPhoneServerWithWebServer,
  webSocketManager
};
