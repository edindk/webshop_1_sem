var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
    res.render('productDetails', { id: req.params.id });
});


module.exports = router;
