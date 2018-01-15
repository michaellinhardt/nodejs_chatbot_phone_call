/*
** Config micro.js
*/

module.exports = {
		stream:
		{
			sampleRateHertz: 16000,
			threshold: 0,
			verbose: false,
			recordProgram: 'rec',
		}, // Try also "arecord" or "sox"
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
				user:
				{
					id: '1',
				},
				call:
				{
					convId: '1',
				},
			},
		},
}
