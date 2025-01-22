const Participant = require('../participant.js')
const ParticipantORM = require('../models/participant.js')

participantDao = {

	createParticipant: async (req, res) => {

		try {

			if (req.body.dataNastere) {
				if (typeof(req.body.dataNastere) === "string" || req.body.dataNastere instanceof String) {
					req.body.dataNastere = new Date(req.body.dataNastere)
				}
			}

			let participant = Participant.fromJSON(req.body)
			let participantORM = await ParticipantORM.create(req.body)

			res.status(201).send("Created participant successfully!")
		}
		catch (error) {
			res.status(422).send(error.message)
		}
	},

	getParticipantByUsername: async(req, res) => {

		try {

			let participant = await ParticipantORM.findByPk(req.params.username);
			res.status(200).json(participant);
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	},

	getParticipantAll: async(req, res) => {

		try {
			const participanti = await ParticipantORM.findAll();
			res.status(200).json(participanti);
		}
		catch(err) {
			res.status(500).send(err.message);
		}

	},

	updateParticipant : async(req, res) => {

		try {

			if (req.body.dataNastere) {
				if (typeof(req.body.dataNastere) === "string" || req.body.dataNastere instanceof String) {
					req.body.dataNastere = new Date(req.body.dataNastere)
				}
			}

			const participant = Participant.fromJSON(req.body)
			await ParticipantORM.update(req.body, { where: { username: req.body.username}})

			res.status(200).send("Updated participant successfully!")

		}
		catch (error) {
			res.status(422).send(error.message)
		}
	},

	deleteParticipantByUsername: async(req, res) => {

		try {
			
			await ParticipantORM.destroy({

				where: {
					username: req.params.username
				}
			})

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteParticipantAll: async(req, res) => {

		try {
			
			await ParticipantORM.truncate()

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	deleteParticipant: async(req, res) => {

		try {
			
			if (req.body.dataNastere) {
				if (typeof(req.body.dataNastere) === "string" || req.body.dataNastere instanceof String) {
					req.body.dataNastere = new Date(req.body.dataNastere)
				}
			}

			const participant = Participant.fromJSON(req.body)
			let participantORM = ParticipantORM.build(req.body)
			await participantORM.destroy()

			res.status(200).send()
		}
		catch(error) {

			res.status(500).send(error.message)
		}
	},

	getDatesByUsername: async (req, res) => {

		try {
			
			let participant = await ParticipantORM.findByPk(req.params.username)
			let evenimente = await participant.getEvents()

			res.status(200).json(evenimente.map((ev) => ev.dataValues.dataDeschidere))


		}
		catch(error) {

			res.status(423).send(error.message)
		}
	}
}

module.exports = participantDao;
