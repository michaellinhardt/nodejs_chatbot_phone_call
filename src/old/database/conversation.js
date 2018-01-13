
const get = database => {

  const conversation = database.sequelize.define('conversation', {
    /* ... */
  })

  conversation.belongsTo(database.call)

  conversation.sync()
  database.call.sync()

  database.conversation = conversation
}

module.exports = {
  get,
}
