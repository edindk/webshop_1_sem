const express = require('express');
const db = require('../config/database');
const Customer = require('../models/customer');

async function getByEmail(email) {
    let customer;

    await Customer.findOne({
        where: { email: email }
    })
        .then(result => {
            if (result) {
                customer = result;
            }
        }).catch(err => console.log(err));
    console.log(customer);
    return customer;
}

async function createCustomer(customer) {
    const newCustomer = Customer.build({
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        companyTypeID: customer.companyType,
        countryID: customer.country,
        zipCode: customer.zipCode,
        firstName: customer.firstName,
        lastName: customer.lastName,
        companyName: customer.companyName,
        CVR: customer.cvr,
        password: customer.password,
        salt: customer.salt
    });

    let message;

    await newCustomer.save().then(newCustomer => {
        message = 'Customer created successfully';
    }).catch(err => console.log(err));

    return message;
}

async function saveAuthToken(authTokenAndCustomerID) {
    await db.query('INSERT INTO AuthTokens (authToken, customerID) VALUES (?, ?)',
        { replacements: [authTokenAndCustomerID.authToken, authTokenAndCustomerID.customerID] }
    ).then(function (projects) {
        console.log('hello')
    })
}


module.exports = {
    getByEmail,
    createCustomer,
    saveAuthToken
}