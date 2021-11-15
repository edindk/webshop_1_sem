const express = require('express');
const db = require('../config/database');
const ProductCategory = require('../models/productCategory');

async function getMultiple() {
    let productCategories;

    await ProductCategory.findAll()
        .then(productCategory => {
            productCategories = productCategory;
        })
        .catch(err => console.log(err));

    return productCategories;
}

module.exports = {
    getMultiple
}