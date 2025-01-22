const sequelize = require('../sequelize.js')
const {DataTypes, UUIDV4} = require('sequelize')
const {genCodAcces }= require("../utils.js")

const Eveniment = sequelize.define('event', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    }, 
     nume: {
        type:DataTypes.STRING,
        allowNull: false
     },
     dataDeschidere: {
        type: DataTypes.DATE,
        allowNull: false
     },
     interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
     }, 
     nrLocuriDisponibile: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
     },
     codAcces: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: function() {
            return genCodAcces()
        }
     },
     stare: {
        type: DataTypes.ENUM('CLOSED', 'OPEN'),
        allowNull: false,
        defaultValue: 'CLOSED'
     },
	 idGrup: {
        type: DataTypes.UUID,
		allowNull: false
	 },
	 imagineEveniment: {
		 type: DataTypes.TEXT('long'),
		 allowNull: false
	 },
	 descriereEveniment: {
		 type: DataTypes.TEXT,
		 allowNull: false
	 }
}, {timestamps: false})

// export default Eveniment;
module.exports = Eveniment;
