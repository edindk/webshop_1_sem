var express = require('express');
const axios = require('axios');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {
    const { email, password, confirmPassword, name, lastName, phone, country, address, zipCode, company, cvr } = req.body;
    // Checks password
    if (password === confirmPassword) {

        // Checks if user is registered
        let customerRegistered
        axios.get('http://localhost:5000/customer/' + email)
            .then(res => {
                customerRegistered = res.data
                renderView();
            }).catch(err => {
                console.log('Error: ', err.message);
            });

        function renderView() {
            if (customerRegistered) {
                res.render('login', {
                    message: 'Bruger med mailen: ' + email + ' findes allerede',

                });
                return;
            }
        }

        // const hashedPassword = getHashedPassword(password);

        // // Store user into the database if you are using one
        // users.push({
        //     firstName,
        //     lastName,
        //     email,
        //     password: hashedPassword.hash,
        //     salt: hashedPassword.salt
        // });

        // console.log(users);

        // res.render('login', {
        //     message: 'Registration Complete. Please login to continue.',
        //     messageClass: 'alert-success'
        // });
    }
});

module.exports = router;
