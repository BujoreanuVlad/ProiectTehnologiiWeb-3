// const sequelize = require('../sequelize.js')
// const {sequelize} = await import('../sequelize.js')
// const {DataTypes, UUIDV4} = await import('sequelize')
const sequelize = require('../sequelize.js')
const {DataTypes, UUIDV4} = require('sequelize')


const GrupEvenimente = sequelize.define('event_group', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    }
,
    nume: {
        type:DataTypes.STRING,
        allowNull: false
     }
}, 
{
   timestamps: false,
})

module.exports = GrupEvenimente;
