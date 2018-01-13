const Sequelize = require('sequelize');

const get = database => {

  // Definition of User Table
  const user = database.sequelize.define('user', {
  		phoneNumber: {
  			type: Sequelize.STRING,
        allowNull: false,
  		},
  		firstName: {
  			type: Sequelize.STRING
  		},
  		lastName: {
  			type: Sequelize.STRING
  		}
  	});

  	user.sync()

    user.add = (phoneNumber) => {
      console.log('Creating \x1b[32muser\x1b[0m with number', phoneNumber)
      user.create({
        phoneNumber: phoneNumber,
      })
    }

    database.user = user
}

module.exports = {
  get,
}
