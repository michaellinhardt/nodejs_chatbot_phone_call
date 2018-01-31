export default class FoodContext {
	start (handler) {
		const function_name = 'start()'
		try {
			this.db = handler.db
			this.brain = handler.brain

			global.warn(__filename, function_name, 'food ready')

		} catch (error) {
			global.err(__filename, function_name, error.stack)
		}
	}

	run () {
		try {

			this.brain.context = 'food'
			this.brain.answer.index = 'food'
			if (!this.brain.db.food) {
				this.brain.db.food = { asked: 0, datetime: "" ,coca: 0, water: 0, sd_thuna: 0, sd_chicken: 0, order: "" }
			}


			if (this[this.brain.intent]) {
				this[this.brain.intent]()
				return true
			}
			return false

		} catch (error) {
			global.err(__filename, 'run()', error.stack)
		}
	}

	default (id) {
		try {
			console.log(this.brain)

			const messages = this.brain.db.messages
			const entities = this.brain.entities

			console.log(`id: ${id}`)
			this.brain.answer.index = 'food'
			this.brain.answer.label = 'default'
			console.log(entities)

			if (entities.datetime)
				this.brain.db.food.datetime = entities.datetime[0].raw
			if (entities['sandwich-tuna']) {
			this.brain.db.food.order += " un sandwich au thon"
				this.brain.db.food.sd_thuna++
			}
			if (entities['sandwich-chicken']) {
				this.brain.db.food.order += " un sandwich au poulet"
				this.brain.db.food.sd_chicken++
			}
			if  (entities.coca) {
			this.brain.db.food.order += " un cocacola"
				this.brain.db.food.coca++
			}
			if (entities.water) {
			this.brain.db.food.order += " de l'eau"
				this.brain.db.food.water++
			}
			if (!(this.brain.db.food.asked) && (this.brain.db.food.coca || this.brain.db.food.water) && !(this.brain.db.food.sd_chicken || this.brain.db.food.sd_thuna))
			{
				this.brain.db.food.asked++;
				this.brain.answer.label = 'want-sandwich'
				return true
			}
			if (!(this.brain.db.food.asked) && !(this.brain.db.food.coca || this.brain.db.food.water) && (this.brain.db.food.sd_chicken || this.brain.db.food.sd_thuna))
			{
				this.brain.db.food.asked++;
				this.brain.answer.label = 'want-drink'
				return true
			}
			if (entities && entities.datetime && entities.datetime[0]) {
				this.brain.db.food.datetime = entities.datetime[0].raw
			}
			if ((this.brain.db.food.coca || this.brain.db.food.water) || (this.brain.db.food.sd_chicken || this.brain.db.food.sd_thuna))
			{
				this.done()
			}
		 this.recap()
		 	if ((this.brain.db.food.coca || this.brain.db.food.water || this.brain.db.food.sd_chicken || this.brain.db.food.sd_thuna))
		 		return true
			return false

		} catch (error) {
			global.err(__filename, 'default', error.stack)
		}
	}

	// food () {
	// 	try {
	// 		this.brain.answer.label = 'default'
	// 		console.log(this.brain.intent)
  //
	// 	} catch (error) {
	// 		global.err(__filename, 'food', error.stack)
	// 	}
	// }

	recap () {
		try {
			console.log(this.brain.db.food)

		} catch (error) {
			global.err(__filename, 'drinkcoca', error.stack)
		}
	}


	sandwichchicken () {
		try {
			this.brain.db.food.sd_chicken++
			if (this.brain.db.food.water == 0 && this.brain.db.food.coca == 0)
			{
				this.brain.db.food.order = "Un sandwich au poulet !"
				this.brain.answer.label = 'want-drink'
			}
			else {
			this.brain.answer.label = 'sandwichchicken-available'
			}

		} catch (error) {
			global.err(__filename, 'sandwichchicken', error.stack)
		}
	}

	done () {
		try {
			if (this.brain.db.food.datetime !== "")
			{
				this.brain.answer.label = 'done'
			}
			else {
			this.brain.answer.label = 'date'
			}

		} catch (error) {
			global.err(__filename, 'done', error.stack)
		}
	}

	order () {
		try {
			if (!this.default())
						this.brain.answer.label = 'default'
		} catch (error) {
			global.err(__filename, 'hungry', error.stack)
		}
	}

	what () {
		try {
			this.brain.answer.label = 'what-do-we-have'
		} catch (error) {
			global.err(__filename, 'what', error.stack)
		}
	}

	}
