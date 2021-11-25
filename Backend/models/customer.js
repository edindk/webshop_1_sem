const Sequelize = require('sequelize');
const db = require('../config/database');

const Customer = db.define('customer', {
    customerID: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
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
        type: Sequelize.TINYINT
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
    }
},
    {
        freezeTableName: true, createdAt: false, updatedAt: false
    });

module.exports = Customer;