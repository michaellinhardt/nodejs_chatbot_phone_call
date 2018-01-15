/*
** Config log.js
** This config is for all log system (file, terminal, ..)
** This file is import/export by config/index.js
**
** bool terminal: output log on terminal
** obj color:
** - string <index>: list of color used for terminal output
*/

module.exports = {
	terminal: true,
	folder: './log',
	color:
	{
		filename: '\x1b[36m',
		message: '\x1b[0m',
		info: '\x1b[33m',
		warn: '\x1b[35m',
		error: '\x1b[31m',
		clear: '\x1b[0m',
	},
}
