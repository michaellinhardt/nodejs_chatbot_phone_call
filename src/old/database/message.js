const Sequelize = require('sequelize');

const get = database => {

  const message = database.sequelize.define('message', {
    content: {
      type: Sequelize.TEXT,
    },
  })

  database.conversation.hasMany(message, {as: 'messages'})

  message.sync()
  database.conversation.sync()

  database.message = message

}

module.exports = {
  get,
}
