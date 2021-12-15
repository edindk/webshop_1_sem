// Loads essential packages
const express = require('express');
const db = require('../config/database');
const Customer = require('../models/customer');

// Returns customer by email
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

// Creates customer
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

// Saves authtoken
async function saveAuthToken(authTokenAndCustomerID) {
    await db.query('INSERT INTO AuthTokens (authToken, customerID) VALUES (?, ?)',
        { replacements: [authTokenAndCustomerID.authToken, authTokenAndCustomerID.customerID] }
    ).then(function () {
        console.log('AuthToken successfully saved');
    })
}

// Updates customer details by authtoken
async function updateByAuthToken(updatedCustomer) {
    let customerID;
    let customerFromDB;

    let result = await db.query('SELECT customerID FROM AuthTokens WHERE authToken=?',
        { replacements: [updatedCustomer.authToken] }
    ).then(function (result) {
        customerID = result[0][0]['customerID'];
    })


    await Customer.findOne({
        where: { customerID: customerID }
    })
        .then(result => {
            if (result) {
                customerFromDB = result;
            }
        }).catch(err => console.log(err));

    customerFromDB.email = updatedCustomer.email ? updatedCustomer.email : customerFromDB.email;
    customerFromDB.phone = updatedCustomer.phone ? updatedCustomer.phone : customerFromDB.phone;
    customerFromDB.address = updatedCustomer.address ? updatedCustomer.address : customerFromDB.address;
    customerFromDB.companyTypeID = updatedCustomer.companyTypeID ? updatedCustomer.companyTypeID : customerFromDB.companyTypeID;
    customerFromDB.countryID = updatedCustomer.countryID ? updatedCustomer.countryID : customerFromDB.countryID;
    customerFromDB.zipCode = updatedCustomer.zipCode ? updatedCustomer.zipCode : customerFromDB.zipCode;
    customerFromDB.modifiedDate = new Date();
    customerFromDB.firstName = updatedCustomer.firstName ? updatedCustomer.firstName : customerFromDB.firstName;
    customerFromDB.lastName = updatedCustomer.lastName ? updatedCustomer.lastName : customerFromDB.lastName;
    customerFromDB.companyName = updatedCustomer.companyName ? updatedCustomer.companyName : customerFromDB.companyName;
    customerFromDB.CVR = updatedCustomer.CVR ? updatedCustomer.CVR : customerFromDB.CVR;
    customerFromDB.password = updatedCustomer.password ? updatedCustomer.password : customerFromDB.password;
    customerFromDB.salt = updatedCustomer.password ? updatedCustomer.salt : customerFromDB.salt;

    await customerFromDB.save();
}

// Deletes all authtokens
async function deleteAutkTokens(customerID, authToken) {
    let result = await db.query('SELECT customerID FROM AuthTokens WHERE authToken=?',
        { replacements: [authToken] }
    );

    if (customerID == result[0][0]['customerID']) {
        await db.query('DELETE FROM AuthTokens WHERE customerID=?', { replacements: [customerID] })
    }
}

module.exports = {
    getByEmail,
    createCustomer,
    saveAuthToken,
    updateByAuthToken,
    deleteAutkTokens
}