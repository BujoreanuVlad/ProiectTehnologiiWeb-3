const ParticipantORM = require('../models/participant.js')
const Eveniment = require('../eveniment.js')
const EvenimentORM = require('../models/eveniment.js')
const InscriereEvenimentORM = require('../models/inscriereEveniment.js')
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


			if (participant) {
				await participant.addEvent(eveniment.getId(), {through: {dataInregistrare: new Date()}})

				res.status(200).send()
			}
			else {
				res.status(404).send("Eroare. Nu am gasit participantul")
			}
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	inscrieUsernameByEvenimentId: async (req, res) => {
		
		try {
			
			participant = await ParticipantORM.findByPk(req.params.username)

			if (participant) {
				await participant.addEvent(req.params.evenimentId, {through: {dataInregistrare: new Date()}})

				res.status(200).send()
			}
			else {
				res.status(404).send("Eroare. Nu am gasit participantul")
			}
		}
		catch(error) {
			res.status(423).send(error.message)
		}
	},

	confirmaPrezenta: async (req, res) => {
		
		try {
			
			eveniment = await EvenimentORM.findByPk(req.params.evenimentId)
			
			if (eveniment.codAcces === req.params.codAcces) {

				inscriere = await InscriereEvenimentORM.findOne({where: {eventId: eveniment.id, participantUsername: req.params.username}})
				
				if (inscriere === null) {
					
					eveniment.addParticipant(req.params.username, {through: { dataInregistrare: new Date(), dataPrezenta: new Date() }})
				}
				else {
				
					inscriere.dataPrezenta = new Date()
					await inscriere.save()
				}

				res.status(200).send()
			}
			else {
				res.status(401).send("Eroare. Cod acces invalid")
			}
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

			if (evenimente) {

				let currentTime = new Date()

				for (let i = 0; i < evenimente.length; i++) {


					if (currentTime >= evenimente[i].dataDeschidere && currentTime <= new Date(evenimente[i].dataDeschidere.getTime() + evenimente[i].interval * 60000)) {
						evenimente[i].stare = "OPEN"
					}
					else {
						evenimente[i].stare = "CLOSED"
					}

					await evenimente[i].save()
				}

				res.status(200).json(evenimente)
			}
			else {
				res.status(404).send()
			}

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
