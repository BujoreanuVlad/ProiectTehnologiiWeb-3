const Eveniment = require('../eveniment.js')
const EvenimentORM = require('../models/eveniment.js')
const { Sequelize, Op } = require("sequelize")

evenimentDao = {

    createEveniment: async (req, res) => {
		
		try {
	
			if (req.body.dataDeschidere) {
				if (typeof(req.body.dataDeschidere) === "string" || req.body.dataDeschidere instanceof String) {
					req.body.dataDeschidere = new Date(req.body.dataDeschidere)
				}
			}

			let eveniment = Eveniment.fromJSON(req.body)
			let evenimentORM = await EvenimentORM.create(req.body)

			res.status(201).send("Created event successfully!")
		}
		catch (error) {
			res.status(422).send(error.message)
		}
	},

	getEvenimentById: async(req, res) => {

		try {

			let eveniment = await EvenimentORM.findByPk(req.params.id);
			res.status(200).json(eveniment);
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	},

	getEvenimentByDate: async(req, res) => {
		try {
			const evenimente = await EvenimentORM.findAll({
					where: {
						dataDeschidere: {
							[Op.eq]: new Date(req.params.date)
						}
					}
				})

			res.status(200).json(evenimente)
		}
		catch(error) {
			res.status(500).send(error.message)
		}
	},

	getDates: async(req, res) => {

		try {

			let date = await EvenimentORM.findAll({
				attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('dataDeschidere')), 'dataDeschidere']]
			})

			res.status(200).json(date.map((ev) => ev.dataValues.dataDeschidere))
		}
		catch(error) {
			res.status(500).send(error.message)
		}
	},

	getEvenimentAll: async(req, res) => {

		try {
			const evenimente = await EvenimentORM.findAll();
			res.status(200).json(evenimente);
		}
		catch(err) {
			res.status(500).send(err.message);
		}

	},

	updateEveniment: async(req, res) => {

		try {

			if (req.body.dataDeschidere) {
				if (typeof(req.body.dataDeschidere) === "string" || req.body.dataDeschidere instanceof String) {
					req.body.dataDeschidere = new Date(req.body.dataDeschidere)
				}
			}

			const eveniment = Eveniment.fromJSON(req.body)
			//let evenimentORM = await EvenimentORM.build(req.body)
			//console.log(evenimentORM)
			await EvenimentORM.update(req.body, { where: { id: req.body.id}})

			res.status(200).send("Updated event successfully!")

		}
		catch (error) {
			res.status(422).send(error.message)
		}
	},

	deleteEvenimentById: async(req, res) => {

		try {
			
			await EvenimentORM.destroy({

				where: {
					id: req.params.id
				}
			})

			res.status(200).send("Deleted event")
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteEvenimentByDate: async(req, res) => {

		try {
			
			await EvenimentORM.destroy({

				where: {
					dataDeschidere: new Date(req.params.date)
				}
			})

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteEvenimentAll: async(req, res) => {

		try {
			
			await EvenimentORM.truncate()

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteEveniment: async(req, res) => {

		try {
			
			if (req.body.dataDeschidere) {
				if (typeof(req.body.dataDeschidere) === "string" || req.body.dataDeschidere instanceof String) {
					req.body.dataDeschidere = new Date(req.body.dataDeschidere)
				}
			}

			const eveniment = Eveniment.fromJSON(req.body)
			let evenimentORM = EvenimentORM.build(req.body)
			await evenimentORM.destroy()

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	}
}

module.exports = evenimentDao;
