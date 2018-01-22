import io from 'socket.io-client'
import websocket from 'websocket'

import { _socket } from '../config'

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
			this.init_handler(handler)
			this.init_socket()
			this.init_event()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method init_socket
	*/
	init_socket () {
		const function_name = 'init_socket()'
		try {
			this.webchat = new io(_socket.url.webchat)
			this.nexmo = new websocket.server({
				httpServer: this.express.server,
				autoAcceptConnections: true,
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method init_handler
	** This method set the websocket config
	*/
	init_handler (handler) {
		const function_name = 'init_handler()'
		try {
			this.context = handler.context
			this.express = handler.express
			this.brain = handler.brain
			this.google = handler.google
			this.db = handler.db

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
			this.nexmo.on('connect', this.nexmo_connect.bind(this));
			this.webchat.on('connect', this.webchat_connect.bind(this));
			this.webchat.on('disconnect', this.webchat_close.bind(this))

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method nexmo_message
	** Called when message income from already open socket
	** It requiere to have already an event_connet() call
	*/
	nexmo_message (message) {
		const function_name = 'nexmo_message()'
		try {
			if (message.type === 'binary') {
				this.google.write(message.binaryData)
			}

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method nexmo_close
	** Called when message income from already open socket
	** It requiere to have already an event_connet() call
	*/
	nexmo_close () {
		const function_name = 'nexmo_close()'
		try {
			this.db.call.close(this.brain.db.call.id)
			this.google.clear_stream()

			global.warn(__filename, function_name, `nexmo close socket ${this.brain.nexmo.from}`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method webchat_newcall
	** Called when message income from already open socket
	** It requiere to have already an event_connet() call
	*/
	webchat_newcall (phoneNumber) {
		const function_name = 'webchat_newcall()'
		try {
			this.webchat.emit(_socket.event.webchat.NEW_CALL, phoneNumber)
			global.warn(__filename, function_name, `send newcall to webchat`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method webchat_close
	** Called when message income from already open socket
	** It requiere to have already an event_connet() call
	*/
	webchat_close () {
		const function_name = 'webchat_close()'
		try {
			global.warn(__filename, function_name, `webchat close socket`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method webchat_connect
	** This method is called when we got a connect event
	*/
	webchat_connect () {
		const function_name = 'webchat_connect()'
		try {
			global.warn(__filename, function_name, `webchat open socket`)

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method webchat_send_message
	** This method is called when we got a connect event
	*/
	webchat_send_message (phoneNumber, sender, message) {
		const function_name = 'webchat_send_message()'
		try {
			this.webchat.emit(_socket.event.webchat.MESSAGE_FROM_ECHO_SERVER, {
				message: message,
				sender: sender,
				phoneNumber: phoneNumber,
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	/*
	** Method nexmo_connect
	** This method is called when we got a connect event
	*/
	async nexmo_connect (connection) {
		const function_name = 'nexmo_connect()'
		try {
			global.warn(__filename, function_name, `nexmo open socket ${this.brain.nexmo.from || ''}`)
			
			this.brain.recast = { }
			this.brain.intent = 'default'
			this.brain.context = 'welcome'
			this.brain.entities = []

			this.brain.db.user = await this.db.user.add(
				this.brain.nexmo.from,
			)

			this.context.run()

			connection.on('message', this.nexmo_message.bind(this))
			connection.on('close', this.nexmo_close.bind(this))

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
