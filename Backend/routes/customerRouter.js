// Loads essential packages
const express = require('express');
const router = express.Router();
const customer = require('../services/customerService');

// Route for getting customer by email
router.get('/:email', async function (req, res, next) {
    try {
        res.json(await customer.getByEmail(req.params.email));
    } catch (err) {
        console.error(`Error while getting customer`, err.message);
        next(err);
    }
});

// Route for creating customer  
router.post('/', async function (req, res, next) {
    try {
        res.json(await customer.createCustomer(req.body));
    } catch (err) {
        console.error(`Error while creating customer`, err.message);
        next(err);
    }
});

// Route for saving authtoken
router.post('/authtoken', async function (req, res, next) {
    try {
        res.json(await customer.saveAuthToken(req.body));
    } catch (err) {
        console.error(`Error while saving authtoken`, err.message);
        next(err);
    }
});

// Route for updating customer by authtoken
router.patch('/', async function (req, res, next) {
    try {
        res.json(await customer.updateByAuthToken(req.body));
    } catch (err) {
        console.error(`Error while updating customer`, err.message);
        next(err);
    }
});

// Route for deleting authtokens that are associated with a customer 
router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await customer.deleteAutkTokens(req.params.id, req.body.authToken));
    } catch (err) {
        console.error(`Error while deleting authTokens`, err.message);
        next(err);
    }
});
module.exports = router;