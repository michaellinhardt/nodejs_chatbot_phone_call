import input from './input'
import output from './output'
import recast from './recast'
import { json } from '../tools'

const run = async message => {
	try {
		const data = { message }

		input.verifyRequest(data)
		
		await recast.analyse(data)
		recast.getResponse(data)

		output.getAnswer(data)
		output.answerReplace(data)
		output.saveLast(data)

		json({ msg: data.message, answer: data.answer })
		return data

    } catch (error) {
		console.log(`${error.toString().replace('Error: ', '')}`)
    }
}

export default run;
