const Sequelize = require('sequelize');

// Database configuration
module.exports = new Sequelize('webshop_1', 'edin', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    freezeTableName: true,
    // operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});