const express = require('express');
const router = express.Router();
const products = require('../services/productService');

router.get('/', async function (req, res, next) {
    try {
        res.json(await products.getMultiple());
    } catch (err) {
        console.error(`Error while getting products`, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await products.create(req.body));
    } catch (err) {
        console.error(`Error while creating product`, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await products.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await products.remove(req.params.id));
    } catch (err) {
        console.error(`Error in deleting product`);
        next(err);
    }
})

module.exports = router;