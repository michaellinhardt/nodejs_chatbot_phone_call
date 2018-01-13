const Sequelize = require('sequelize');

// MySQL Server Configuration
const sequelize = new Sequelize('recastAI_schema', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	dialectOptions: {socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: false,
});

// Connexion to the MySQL server
sequelize
	.authenticate()
	.then(() => {
		console.log('\x1b[32mConnection to database has been established successfully.\x1b[0m');
	})
	.catch(err => {
		console.error('\x1b[31mUnable to connect to the database.\x1b[0m', err);
	});

module.exports = sequelize
