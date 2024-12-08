// const sequelize = require('../sequelize.js')
// const {sequelize} = await import('../sequelize.js')
// const {DataTypes, UUIDV4} = await import('sequelize')
const sequelize = require('../sequelize.js')
const {DataTypes, UUIDV4} = require('sequelize')


const GrupEvenimente = sequelize.define('grupEvenimente', {
    id: {
        type: DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey: true
    },
    nume: {
        type:DataTypes.STRING,
        allowNull: false
     }
})

module.exports = GrupEvenimente;