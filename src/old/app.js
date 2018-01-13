import express from 'express'
import bodyParser from 'body-parser'

import config from '../config'
import run from './controller'

const app = express()
app.set('port', config.port || 4242)
app.use(bodyParser.json())

/*
** Here is the code to run when a message is coming on road "/"
*/
app.use('/', async (request, response) => {
	try {
		await run(request.body.message)
		response.sendStatus(200)
	} catch (error) {
		console.log(`${error.toString().replace('Error: ', '')}`)
		response.sendStatus(400)
	}
})

app.listen(app.get('port'), () => console.log('Start listening port ', app.get('port')) )
