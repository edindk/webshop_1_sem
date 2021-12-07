const Sequelize = require('sequelize');
const db = require('../config/database');

const Invoice = db.define('invoice', {
    invoiceID: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    currencyID: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
    },
    customerID: {
        type: Sequelize.SMALLINT
    },
    total: {
        type: Sequelize.DECIMAL
    }
},
    {
        freezeTableName: true, createdAt: false, updatedAt: false
    });

module.exports = Invoice;