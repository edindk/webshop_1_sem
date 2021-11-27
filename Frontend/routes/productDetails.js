var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
    let customerData = req.cookies['CustomerData'];
    res.render('productDetails', { id: req.params.id, 'customerData': customerData });
});


module.exports = router;
