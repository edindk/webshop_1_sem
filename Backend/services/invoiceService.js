// Loads essential packages
const express = require('express');
const db = require('../config/database');
const Invoice = require('../models/invoice');
const InvoiceLine = require('../models/invoiceLine');

// Creates invoice 
async function createInvoice(data) {
    let invoiceID;
    let shoppingCart = data['shoppingCart'];

    const result = await db.transaction(async (t) => {
        let total = 0;
        shoppingCart.forEach(element => {
            total += parseInt(element.quantity) * parseInt(element.price);
        });

        const invoice = await Invoice.create({
            customerID: data['customerID'],
            total: total,
        }, { transaction: t }).then(function (result) {
            invoiceID = result.invoiceID;
        })

        for (let i = 0; i < shoppingCart.length; i++) {
            let subTotal = parseInt(shoppingCart[i].quantity) * parseInt(shoppingCart[i].price)
            const invoiceLine = await InvoiceLine.create({
                productID: parseInt(shoppingCart[i].productID),
                invoiceID: invoiceID,
                quantity: parseInt(shoppingCart[i].quantity),
                subTotal: subTotal
            }, { transaction: t })
        }
    });
}

module.exports = {
    createInvoice
}