// const sequelize = require('../sequelize.js')
// const {DataTypes, UUIDV4} = await import('sequelize')

const crypto = require('crypto-js')
const sequelize = require('../sequelize.js')
const {DataTypes, UUIDV4} = require('sequelize')

const Participant = sequelize.define('participant', {
    nume: {
        type:DataTypes.STRING,
        allowNull: false, 
        validate: {
            is: /^[a-zA-Z][a-zA-Z\-]+[a-zA-Z]$/
        }
     },
     prenume: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z][a-zA-Z\-]+[a-zA-Z]$/
        }
     },
     nrTelefon: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            is: /^\d\d\d\d\d\d\d\d\d\d$/
        }
     }, 
     email: {
        type:DataTypes.STRING,
        allowNull: false, 
        validate: {
            is: /^\w[\w\.\-]*\w@\w[\w\-\.]*\w$/
        }
     },
     dataNastere: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            validateBornAfterToday(value) {
                if(new Date(value) >= new Date()) {
                    throw new Error("Invalid date!");
                }
            }
        }
     },
     username: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            is:  /^\w+$/
        },
        primaryKey: true
     },
     password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is:  /^[^\s]+$/
        },
        set(value) {
            this.setDataValue('password', crypto.AES.encrypt(value, "cheie magica").toString());
        }
     }
}, {timestamps: false})

module.exports = Participant;
