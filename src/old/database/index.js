
console.log("Connecting to the database..");

import sequelize from './config.js'

const database = {
	sequelize,
}

require('./user.js').get(database)
require('./call.js').get(database)
require('./conversation.js').get(database)
require('./message.js').get(database)

module.exports = database
