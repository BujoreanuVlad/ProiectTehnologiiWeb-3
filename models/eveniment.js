const sequelize = require('../sequelize.js')
// const { sequelize } = await import('../sequelize.js')

// const {DataTypes, UUIDV4} = await import('sequelize')
const {DataTypes, UUIDV4} = require('sequelize')
// const { genCodAcces } = await import("../utils.js")
const {genCodAcces }= require("../utils.js")

const Eveniment = sequelize.define('event', {
    id: {
        type: DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey: true
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
	 }
})

// export default Eveniment;
module.exports = Eveniment;
