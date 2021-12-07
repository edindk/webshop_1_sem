var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let removeNav = true;

    res.render('admin_panel/admin', { layout: 'admin' });
});


module.exports = router;
