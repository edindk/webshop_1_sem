//Loads the express module
const express = require('express');

//Creates our express server
const app = express();
const port = 3000;

var indexRouter = require('./routes/index');

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

// Routes
app.use('/', indexRouter);

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
