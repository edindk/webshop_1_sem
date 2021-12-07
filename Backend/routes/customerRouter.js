const express = require('express');
const router = express.Router();
const customer = require('../services/customerService');

router.get('/:email', async function (req, res, next) {
    try {
        res.json(await customer.getByEmail(req.params.email));
    } catch (err) {
        console.error(`Error while getting customer`, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await customer.createCustomer(req.body));
    } catch (err) {
        console.error(`Error while creating customer`, err.message);
        next(err);
    }
});

router.post('/authtoken', async function (req, res, next) {
    try {
        res.json(await customer.saveAuthToken(req.body));
    } catch (err) {
        console.error(`Error while saving authtoken`, err.message);
        next(err);
    }
});

router.patch('/', async function (req, res, next) {
    try {
        res.json(await customer.updateByAuthToken(req.body));
    } catch (err) {
        console.error(`Error while updating customer`, err.message);
        next(err);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await customer.deleteAutkTokens(req.params.id, req.body.authToken));
    } catch (err) {
        console.error(`Error while deleting authTokens`, err.message);
        next(err);
    }
});
module.exports = router;