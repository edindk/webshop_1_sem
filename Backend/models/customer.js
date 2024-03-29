const Sequelize = require('sequelize');
const db = require('../config/database');

const Customer = db.define('customer', {
    customerID: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    companyTypeID: {
        type: Sequelize.SMALLINT
    },
    countryID: {
        type: Sequelize.SMALLINT
    },
    zipCode: {
        type: Sequelize.SMALLINT
    },
    isActive: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    },
    createDate: {
        type: Sequelize.DATE
    },
    modifiedDate: {
        type: Sequelize.DATE
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    companyName: {
        type: Sequelize.STRING
    },
    CVR: {
        type: Sequelize.SMALLINT
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    }
},
    {
        freezeTableName: true, createdAt: false, updatedAt: false
    });

module.exports = Customer;