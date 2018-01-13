const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const WebSocketServer = require('websocket').server;
const fs = require('fs');

const PORT = 8000;

/**-------------------------------------------------------------------------***
***----------------------------- Routing -----------------------------------***
***-------------------------------------------------------------------------**/

const stream = require('./socketManager').stream;

app.get('/ncco', (req, res) => {
  console.log(req.query.from);
  try {
    stream.client = { };
    if (req.url.split('&uuid=')[1]) {
      stream.client.uuid = req.url.split('&uuid=')[1];
    }
    stream.client.phoneNumber = req.query.from;
  } catch(err) {
    console.log(err);
  }
  fs.readFile('./config/ncco.json', function(error, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data, 'utf-8');
    console.log("ncco.json requested");
  });
});

app.post('/events', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end("", 'utf-8');
});

/**-------------------------------------------------------------------------***
***------------------------- Socket management -----------------------------***
***-------------------------------------------------------------------------**/

const sm = require('./socketManager');
const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true,
});

wsServer.on('connect', sm.webSocketManager);

/**-------------------------------------------------------------------------***
***------------------------- Starting Server -------------------------------***
***-------------------------------------------------------------------------**/

server.listen(PORT, () => {
  console.log("Listening to port : " + PORT);
  sm.connectPhoneServerWithWebServer();
});
