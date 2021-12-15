// Loads essential packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

// Creates our express server
const app = express();

// Sets the express server to use cors
app.use(cors());

// Sets the express server to use bodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Routes
app.use('/products', require('./routes/productRouter'));
app.use('/productcategory', require('./routes/productCategoryRouter'));
app.use('/customer', require('./routes/customerRouter'));
app.use('/invoice', require('./routes/invoiceRouter'));

// Serves static files
app.use(express.static('public'))

// Sets the port
const PORT = process.env.PORT || 5000;

// Starts the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));