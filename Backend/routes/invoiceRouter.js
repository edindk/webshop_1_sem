const express = require('express');
const router = express.Router();
const invoice = require('../services/invoiceService');

router.post('/', async function (req, res, next) {
    try {
        res.json(await invoice.createInvoice(req.body));
    } catch (err) {
        console.error(`Error while creating invoice`, err.message);
        next(err);
    }
});
module.exports = router;