const { Sequelize } = require('sequelize');
// const { Sequelize } = await import('sequelize')

const sequelize = new Sequelize("event_app", "root", "", {
    host: 'localhost',
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