/*
** Config micro.js
*/

module.exports = {
	enable: false,
	stream:
	{
		sampleRateHertz: 16000,
		threshold: 0,
		verbose: false,
		recordProgram: 'rec',
	},
	fill:
	{
		nexmo:
		{
			to: 'test',
			from: 'microphone',
			conversation_uuid: 'debug',
			uuid: 'root',
		},
		db: {
			user: { id: '1' },
			call: { convId: '1'},
		},
	},
}
