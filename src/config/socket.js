/*
** Config socket.js
** Requiered by express
*/

module.exports = {
	url:
	{
		webchat: 'http://localhost:8888',
	},
	event:
	{
		webchat:
		{
			MESSAGE_FROM_ECHO_SERVER: 'MESSAGE_FROM_ECHO_SERVER',
			NEW_CALL: 'NEW_CALL',
		},
	}
}
