const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Routes
app.use('/products', require('./routes/productRouter'));
app.use('/productcategory', require('./routes/productCategoryRouter'));

// Serves static files
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));