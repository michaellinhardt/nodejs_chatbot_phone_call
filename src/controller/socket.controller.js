import websocket from 'websocket'

import { _log, _express } from '../config'

import ExtendController from './extend.controller'

/*
** Class SocketController
** This controller start socket server and redirect incoming event
** To the dedicated controller
*/
module.exports = class SequelizeController extends ExtendController {
	constructor () { super({ name: __filename }) }

	/*
	** Method start ()
	** This method start the socket server
	*/
	async start (handler) {
		const function_name = 'start()'
		try {
			this.init_config(handler)
			this.init_event()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method init_config
	** This method set the websocket config
	*/
	init_config (handler) {
		const function_name = 'init_config()'
		try {
			this.event = new websocket.server({
				httpServer: handler.express.server,
				autoAcceptConnections: true,
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method init_event
	** This set all handler for incoming event from socket
	**
	** object Name: description
	*/
	init_event () {
		const function_name = 'init_event()'
		try {
			this.event.on('connect', this.event_connect.bind(this));

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method event_message
	** Called when message income from already open socket
	** It requiere to have already an event_connet() call
	*/
	event_message (message) {
		const function_name = 'event_message()'
		try {
			if (message.type === 'binary') {
				// console.log('audio')
			}

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

	/*
	** Method event_close
	** Called when message income from already open socket
	** It requiere to have already an event_connet() call
	*/
	event_close () {
		const function_name = 'event_close()'
		try {
			global.warn(__filename, function_name, `close the websocket connection`)

		} catch (error) {
			global.err(__filename, function_name, error)
		}
	}

	/*
	** Method event_connect
	** This method is called when we got a connect event
	*/
	event_connect (connection) {
		const function_name = 'event_connect()'
		try {
			global.warn(__filename, function_name, 'open connection by websocket')
			connection.on('message', this.event_message)
			connection.on('close', this.event_close)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
