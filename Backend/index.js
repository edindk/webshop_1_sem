const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());

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

// Serves static files
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));