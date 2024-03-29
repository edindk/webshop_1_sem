// Loads essential packages
const express = require('express');
const router = express.Router();
const productCategory = require('../services/productCategoryService');

// Route for getting all categories
router.get('/', async function (req, res, next) {
    try {
        res.json(await productCategory.getMultiple());
    } catch (err) {
        console.error(`Error while getting categories`, err.message);
        next(err);
    }
});

module.exports = router;