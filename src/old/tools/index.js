import prettyjson from 'prettyjson'
import path from 'path'

const color = {
  filename: '\x1b[36m',
  message: '\x1b[0m',
  info: '\x1b[33m',
  warn: '\x1b[35m',
  error: '\x1b[31m',
  clear: '\x1b[0m',
}

const json = (obj) => {
	return process.stdout.write(`${prettyjson.render(obj)}\r\n${_log.color.clear}`)
}

const errorMsg = (file, func, msg) => {
	const where = `${color.filename}${path.basename(file).replace('.js', '')}.${func}()`
	return `${color.error}*** Error in ${where}:\r\n${color.error}${msg}${color.clear}`
}

const error = (file, func, msg) => {
	throw new Error(errorMsg(file, func, msg))
}

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const randomArr = (array) => array[Math.floor(Math.random() * array.length)]

module.exports = {
	json,
	errorMsg,
	error,
	randomArr,
	sleep,
}
