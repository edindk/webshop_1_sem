const Sequelize = require('sequelize');
const db = require('../config/database');

const ProductCategory = db.define('productCategory', {
    productCategoryID: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
    },
    categoryName: {
        type: Sequelize.STRING,
    },
    imageFile: {
        type: Sequelize.STRING
    },
},
    {
        freezeTableName: true, createdAt: false, updatedAt: false
    });

module.exports = ProductCategory;