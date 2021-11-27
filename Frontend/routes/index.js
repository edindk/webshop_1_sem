var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', (req, res) => {
    let customerData = req.cookies['CustomerData'];
    
    res.render('index', {
        'customerData': customerData
    });
});

module.exports = router;
