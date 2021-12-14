var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    let removeNav = true;

    res.render('admin_panel/admin', { layout: 'admin' });
});

router.get('/delete/:id', async (req, res) => {
    await axios.delete('http://localhost:5000/products/delete/' + req.params.id)
        .then(res => {
            console.log(res);
        })
    res.redirect('http://localhost:3000/admin');
})

module.exports = router;
