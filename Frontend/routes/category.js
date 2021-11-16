var express = require('express');
var router = express.Router();

router.get('/:id/:categoryName', (req, res) => {
    res.render('category', { id: req.params.id, categoryName: req.params.categoryName });
});


module.exports = router;
