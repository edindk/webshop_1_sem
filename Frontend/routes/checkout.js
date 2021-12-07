var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let customerData = req.cookies['CustomerData'];

    if (customerData) {
        res.render('checkout', {
            'customerData': customerData
        });
    }
    else {
        res.render('login');
    }

});

router.get('/confirmation', (req, res) => {
    let customerData = req.cookies['CustomerData'];
    res.render('confirmationPage', {
        'customerData': customerData
    });
});

module.exports = router;
