const sequelize = require('../sequelize.js')
const Eveniment = require("./eveniment.js")
const Participant = require("./participant.js")

const {DataTypes, UUIDV4} = require('sequelize')

const InscriereEveniment = sequelize.define('inscriere_eveniment', {

	dataInregistrare: {
		type: DataTypes.DATE,
		allowNull: false
	},
	dataPrezenta: {
		type: DataTypes.DATE,
		allowNull: true
	}
})

module.exports = InscriereEveniment;
