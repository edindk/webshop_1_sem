const Sequelize = require('sequelize');
const db = require('../config/database');

const InvoiceLine = db.define('invoiceLine', {
    invoiceLineID: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    productID: {
        type: Sequelize.SMALLINT
    },
    invoiceID: {
        type: Sequelize.SMALLINT
    },
    quantity: {
        type: Sequelize.SMALLINT
    },
    subTotal: {
        type: Sequelize.DECIMAL
    }
},
    {
        freezeTableName: true, createdAt: false, updatedAt: false
    });

module.exports = InvoiceLine;