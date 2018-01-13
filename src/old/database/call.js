const Sequelize = require('sequelize');

const get = database => {

  const call = database.sequelize.define('call', {
     finished: {
       type: Sequelize.BOOLEAN,
       allowNull: false,
       defaultValue: false
     },
  });

  database.user.hasMany(call, {as: 'calls'})

  call.sync()
  database.user.sync()

  call.add = (User) => {

  }

  database.call = call
}

module.exports = {
  get,
}
