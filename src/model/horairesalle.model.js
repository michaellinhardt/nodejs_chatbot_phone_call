import _ from 'lodash'
import Sequelize from 'sequelize'

const HorairesalleSchema = {
	dayId: {
		type: Sequelize.TINYINT,
		allowNull: false,
	},
	day: {
		type: Sequelize.STRING,
	},
	start: {
		type: Sequelize.STRING
	},
	end: {
		type: Sequelize.STRING
	}
}

export default class HorairesalleModel {
	async start (handler) {
		const function_name = 'start()'
		try {
			this.brain = handler.brain
			this.schema = handler.db.define('horairesalle', HorairesalleSchema)
			await this.schema.sync()
			this.verif_db()

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async verif_db (phoneNumber) {
		try {
			const function_name = 'add()'
			const weekday = new Array(7);
			weekday[0] = 'dimanche';
			weekday[1] = 'lundi';
			weekday[2] = 'mardi';
			weekday[3] = 'mercredi';
			weekday[4] = 'jeudi';
			weekday[5] = 'vendredi';
			weekday[6] = 'samedi';

			const time = new Array(7);
			time[0] = '';
			time[1] = ['10 heures', '17 heures'];
			time[2] = ['10 heures', '17 heures']
			time[3] = ['10 heures', '17 heures']
			time[4] = ['13 heures', '20 heures']
			time[5] = ['13 heures', '20 heures']
			time[6] = '';

			this.planning = new Array(7)
			_.forEach(weekday, async (value, index) => {
				this.planning[index] = (await this.schema.find({
					where: {
						dayId: index,
					},
				}))
				if (this.planning[index] === null) {
					this.planning[index] = (await this.schema.create({
						dayId: index,
						day: value,
						start: time[index][0],
						end: time[index][1],
					})).dataValues
				}
			})

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	async add (phoneNumber) {
		try {
			const function_name = 'add()'
			return (await this.schema.findOrCreate({
				where: {
					phoneNumber: phoneNumber,
				},
				defaults: {},
			}))[0].dataValues

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}
}
