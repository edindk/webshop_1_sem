//Loads the express module
const express = require('express');

// Loads body-parser
const bodyParser = require('body-parser');

//Creates our express server
const app = express();
const port = 3000;

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var productsRouter = require('./routes/products');
var productDetailsRouter = require('./routes/productDetails');
var cartRouter = require('./routes/cart');
var authenticationRouter = require('./routes/authentication');
var customerDetailsRouter = require('./routes/customerDetails');
var checkoutRouter = require('./routes/checkout');
var adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/products', productsRouter);
app.use('/productdetails', productDetailsRouter);
app.use('/cart', cartRouter);
app.use('/authentication', authenticationRouter);
app.use('/customerdetails', customerDetailsRouter);
app.use('/checkout', checkoutRouter);
app.use('/admin', adminRouter);

//cors 
const cors = require('cors');
app.use(cors());

//Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'default',
}));

//Serves static files
app.use(express.static('public'))

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
