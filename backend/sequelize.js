const { Sequelize } = require('sequelize');
// const { Sequelize } = await import('sequelize')

const sequelize = new Sequelize({
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DB_PORT,
	host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     storage: './mysql/database.db',

// });

// export default { sequelize };
module.exports = sequelize;
