const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('product', {
    productID: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    productCategoryID: {
        type: Sequelize.SMALLINT,
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    partNumber: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    inStock: {
        type: Sequelize.SMALLINT
    },
    isActive: {
        type: Sequelize.TINYINT
    },
    imageFile: {
        type: Sequelize.STRING
    },
    createDate: {
        type: Sequelize.DATE
    },
    modifiedDate: {
        type: Sequelize.DATE
    }
},
    {
        freezeTableName: true, createdAt: false, updatedAt: false
    });

module.exports = Product;
