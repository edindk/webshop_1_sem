const express = require('express');
const db = require('../config/database');
const Customer = require('../models/customer');

async function getByEmail(email) {
    let customerRegistered = false;

    await Customer.findOne({
        where: { email: email }
    })
        .then(product => {
            console.log(product);
            if (product) {
                customerRegistered = true;
            }
        }).catch(err => console.log(err));

    return customerRegistered;
}

module.exports = {
    getByEmail
}