var express = require('express');
var router = express.Router();

router.get('/:id/:categoryName', (req, res) => {
    let customerData = req.cookies['CustomerData'];
    res.render('category', { id: req.params.id, categoryName: req.params.categoryName, 'customerData': customerData });
});


module.exports = router;
