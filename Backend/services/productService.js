const { application } = require('express');
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

async function getById(id) {
    let productToReturn;

    await Product.findOne({
        where: { productID: id }
    })
        .then(product => {
            productToReturn = product
        })
        .catch(err => console.log(err));

    return productToReturn;
}

async function getRecent() {
    let products = await getMultiple();
    let recentProducts = [];

    for (var i = products.length - 1; i >= 5; i--) {
        recentProducts.push(products[i]);
    }

    return recentProducts;
}

async function getByCategoryId(id) {
    let products;

    await Product.findAll({
        where: { productCategoryID: id }
    })
        .then(product => {
            products = product;
        })
        .catch(err => console.log(err));

    return products
}

async function create(productData, imageFile) {
    let message;
    console.log(productData);
    const newProduct = Product.build({
        name: productData.name,
        productCategoryID: productData.productCategory,
        description: productData.description,
        price: productData.price,
        inStock: productData.inStock,
        imageFile: imageFile,
        isActive: 1,
        partNumber: Math.random()
    });

    await newProduct.save()
        .then(newProduct => {
            message = 'Product created successfully';
        })
        .catch(err => message = 'Error in creating product ' + err);

    return message;
}

async function update(id, updatedProduct, imageFile) {
    let message;
    console.log(updatedProduct);
    await Product.findOne({
        where: { productID: id }
    })
        .then(function (product) {
            product.productCategoryID = updatedProduct.productCategory;
            product.name = updatedProduct.name;
            product.description = updatedProduct.description;
            product.imageFile = imageFile;
            product.partNumber = Math.random();
            product.price = updatedProduct.price;
            product.inStock = updatedProduct.inStock;
            product.isActive = 1;
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
    getById,
    getRecent,
    getByCategoryId,
    create,
    update,
    remove
}