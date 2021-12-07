var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let customerData = req.cookies['CustomerData'];

    res.render('customerDetails', {
        'customerData': customerData
    });
    
});


module.exports = router;
