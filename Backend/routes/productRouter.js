// Loads essential packages
const express = require('express');
const router = express.Router();
const products = require('../services/productService');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

// Used for uploading images
var upload = multer({ storage: storage });

// Router for getting all products 
router.get('/', async function (req, res, next) {
    try {
        res.json(await products.getMultiple());
    } catch (err) {
        console.error(`Error while getting products`, err.message);
        next(err);
    }
});

// Router for getting recent product
router.get('/getrecent', async function (req, res, next) {
    try {
        res.json(await products.getRecent());
    } catch (err) {
        console.error(`Error while getting recent products`, err.message);
        next(err);
    }
});

// Router for getting product by id 
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await products.getById(req.params.id));
    } catch (err) {
        console.error(`Error while getting product`, err.message);
        next(err);
    }
});

// Router for getting product by category id 
router.get('/getbycategoryid/:id', async function (req, res, next) {
    try {
        res.json(await products.getByCategoryId(req.params.id));
    } catch (err) {
        console.error(`Error while getting products by categoryID`, err.message);
        next(err);
    }
});

// Router for creating product
router.post('/', upload.single('imageFile'), async function (req, res, next) {
    let imageFile = 'http://localhost:5000/images/products/' + req.file.originalname;
    try {
        await products.create(req.body, imageFile);
        res.redirect('http://localhost:3000/admin');
    } catch (err) {
        console.error(`Error while creating product`, err.message);
        next(err);
    }
});

// Router for updating product 
router.post('/update/:id', upload.single('imageFile'), async function (req, res, next) {
    let imageFile = 'http://localhost:5000/images/products/' + req.file.originalname;
    try {
        await products.update(req.params.id, req.body, imageFile);
        res.redirect('http://localhost:3000/admin');
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
});

// Router for deleting product
router.delete('/delete/:id', async function (req, res, next) {
    try {
        await products.remove(req.params.id);
        res.json('Product deleted');
    } catch (err) {
        console.error(`Error in deleting product`);
        next(err);
    }
})

module.exports = router;