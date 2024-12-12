const GrupEvenimente = require('../grupEvenimente.js')
const GrupEvenimenteORM = require('../models/grupEvenimente.js')
const { Sequelize, Op } = require("sequelize")

grupEvenimenteDao = {

    createGrupEvenimente: async (req, res) => {
		
		try {
	
			let grupEvenimente = GrupEvenimente.fromJSON(req.body)
			let grupEvenimenteORM = await GrupEvenimenteORM.create(req.body)

			res.status(201).send("Created event group successfully!")
		}
		catch (error) {
			res.status(422).send(error.message)
		}
	},

	getGrupEvenimenteById: async(req, res) => {

		try {

			let grupEvenimente = await GrupEvenimenteORM.findByPk(req.params.id);
			res.status(200).json(grupEvenimente);
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	},
	getGrupEvenimenteAll: async(req, res) => {

		try {
			const grupEvenimente = await GrupEvenimenteORM.findAll();
			res.status(200).json(grupEvenimente);
		}
		catch(err) {
			res.status(500).send(err.message);
		}

	},

	updateGrupEvenimente: async(req, res) => {

		try {

			const grupEvenimente = GrupEveniment.fromJSON(req.body)
			await GrupEvenimenteORM.update(req.body, { where: { id: req.body.id}})

			res.status(200).send("Updated event group successfully!")

		}
		catch (error) {
			res.status(422).send(error.message)
		}
	},

	deleteGrupEvenimenteById: async(req, res) => {

		try {
			
			await GrupEvenimenteORM.destroy({

				where: {
					id: req.params.id
				}
			})

			res.status(200).send("Deleted event group")
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteGrupEvenimenteAll: async(req, res) => {

		try {
			
			await GrupEvenimenteORM.truncate()

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteGrupEvenimente: async(req, res) => {

		try {
			
			const grupEvenimente = GrupEvenimente.fromJSON(req.body)
			let grupEvenimenteORM = GrupEvenimenteORM.build(req.body)
			await grupEvenimenteORM.destroy()

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	getEvenimenteById: async(req, res) => {

		try {

			let grupEvenimente = await GrupEvenimenteORM.findByPk(req.params.id);
			let evenimente = await grupEvenimente.getEvents()

			res.status(200).json(evenimente);
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	},
}

module.exports = grupEvenimenteDao;
