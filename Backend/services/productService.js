const express = require('express');
const db = require('../config/database');
const Product = require('../models/product');

async function getMultiple() {
    let products;

    await Product.findAll()
        .then(product => {
            products = product;
        })
        .catch(err => console.log(err));

    return products;
}

async function create(product) {
    let message;

    const newProduct = Product.build({
        productCategoryID: product.productCategoryID,
        name: product.name,
        description: product.description,
        partNumber: product.partNumber,
        price: product.price,
        inStock: product.inStock,
        isActive: product.isActive
    });

    await newProduct.save()
        .then(newProduct => {
            message = 'Product created successfully';
        })
        .catch(err => message = 'Error in creating product');

    return message;
}

async function update(id, updatedProduct) {
    let message;

    await Product.findOne({
        where: { productID: id }
    })
        .then(function (product) {
            product.productCategoryID = updatedProduct.productCategoryID;
            product.name = updatedProduct.name;
            product.description = updatedProduct.description;
            product.partNumber = updatedProduct.partNumber;
            product.price = updatedProduct.price;
            product.inStock = updatedProduct.inStock;
            product.isActive = updatedProduct.isActive;
            product.modifiedDate = new Date();
            product.save();

            message = 'Product updated successfully';
        })
        .catch(err => message = 'Error in updating product');

    return message;
}

async function remove(id) {
    let message;

    await Product.destroy({
        where: { productID: id }
    })
        .then(function (product) {
            if (product) {
                message = 'Product deleted sucessfully';
            }
            else {
                throw error;
            }
        })
        .catch(err => message = 'Error in deleting product');

    return message;
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}