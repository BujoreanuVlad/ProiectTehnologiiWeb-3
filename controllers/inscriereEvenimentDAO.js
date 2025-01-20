const ParticipantORM = require('../models/participant.js')
const Eveniment = require('../eveniment.js')
const EvenimentORM = require('../models/eveniment.js')
const { Sequelize, Op } = require("sequelize")

inscriereEvenimentDao = {
	
	inscrieUsername: async (req, res) => {
		
		try {
			
			if (req.body.dataDeschidere) {
				if (typeof(req.body.dataDeschidere) === "string" || req.body.dataDeschidere instanceof String) {
					req.body.dataDeschidere = new Date(req.body.dataDeschidere)
				}
            }			

			let eveniment = Eveniment.fromJSON(req.body)

			participant = await ParticipantORM.findByPk(req.params.username)
			await participant.addEvent(eveniment.getId())

			res.status(200).send()
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	inscrieUsernameByEvenimentId: async (req, res) => {
		
		try {
			
			participant = await ParticipantORM.findByPk(req.params.username)
			await participant.addEvent(req.params.evenimentId)

			res.status(200).send()
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	stergeUsername: async (req, res) => {


		try {
			
			if (req.body.dataDeschidere) {
				if (typeof(req.body.dataDeschidere) === "string" || req.body.dataDeschidere instanceof String) {
					req.body.dataDeschidere = new Date(req.body.dataDeschidere)
				}
            }			

			let eveniment = Eveniment.fromJSON(req.body)

			participant = await ParticipantORM.findByPk(req.params.username)
			await participant.removeEvent(eveniment.getId())

			res.status(200).send()
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},


	stergeUsernameByEvenimentId: async (req, res) => {
		
		try {
			
			participant = await ParticipantORM.findByPk(req.params.username)
			await participant.removeEvent(req.params.evenimentId)

			res.status(200).send()
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	stergeToateEvenimenteleByUsername: async (req, res) => {

		try {
			
			participant = await ParticipantORM.findByPk(req.params.username)
			await participant.removeEvents(await participant.getEvents())

			res.status(200).send()
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	stergeToateEvenimenteleByEvenimentId: async (req, res) => {

		try {
			
			eveniment = await EvenimentORM.findByPk(req.params.evenimentId)
			await eveniment.removeParticipants(await evenimente.getParticipants())

			res.status(200).send()
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	getEvents: async (req, res) => {

		try {
			
			let participant = await ParticipantORM.findByPk(req.params.username)
			let evenimente = await participant.getEvents()

			res.status(200).json(evenimente)
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	getParticipanti: async (req, res) => {

		try {
			
			eveniment = await EvenimentORM.findByPk(req.params.evenimentId)
			let participanti = await eveniment.getParticipants()

			res.status(200).json(participanti)
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},
}

module.exports = inscriereEvenimentDao;
