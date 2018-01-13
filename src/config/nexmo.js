/*
** Config nexmo.js
** This config is sended to Nexmo to indicate the socket process
*/

const ngrok = 'b55322f4.ngrok.io'

module.exports = [
	{
		"action": "talk",
		"text": "Bonjour Michael je suis heureuse de te parler à nouveau. Que puis-je faire pour toi ?",
		"voiceName": "Celine",
	},
	{
		"action": "connect",
		"eventUrl":
		[
			`https://${ngrok}/nexmo/events`,
		],
		"from": "33172770593",
		"endpoint":
		[
			{
				"type": "websocket",
				"uri": `ws://${ngrok}/socket`,
				"content-type": "audio/l16;rate=16000",
				"headers":
				{
					"whatever": "metadata_you_want",
				}
			}
		]
	}
]
