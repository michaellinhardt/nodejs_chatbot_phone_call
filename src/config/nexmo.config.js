/*
** Config nexmo.js
** This config is sended to Nexmo to indicate the socket process
*/

module.exports = [
	{
		"action": "talk",
		"text": "Ici Daulaurésse.",
		"voiceName": "Celine",
	},
	{
		"action": "connect",
		"eventUrl":
		[
			"https://b55322f4.ngrok.io/nexmo/events",
		],
		"from": "33172770593",
		"endpoint":
		[
			{
				"type": "websocket",
				"uri": "ws://b55322f4.ngrok.io/socket",
				"content-type": "audio/l16;rate=16000",
				"headers":
				{
					"whatever": "metadata_you_want",
				}
			}
		]
	}
]
