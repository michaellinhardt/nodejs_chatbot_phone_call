/*
** Config nexmo.js
** This config is sended to Nexmo to indicate the socket process
*/

module.exports = [
	{
		"action": "connect",
		"eventUrl":
		[
			"https://6ee72150.ngrok.io/nexmo/events",
		],
		"from": "33172770596",
		"endpoint":
		[
			{
				"type": "websocket",
				"uri": "ws://6ee72150.ngrok.io/socket",
				"content-type": "audio/l16;rate=16000",
				"headers":
				{
					"whatever": "metadata_you_want",
				}
			}
		]
	}
]
