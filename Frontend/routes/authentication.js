var express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const { create } = require('../../Backend/services/productService');
const { route } = require('.');
var router = express.Router();

router.use(cookieParser());

router.use((req, res, next) => {
    //Get auth token from the cookies
    req.cookies['AuthToken']
    const authToken = req.cookies['AuthToken'];

    if (req.cookies['CustomerData']) {
        const customerData = req.cookies['CustomerData'];
    }

    next();

});

router.get('/', (req, res) => {
    let customerData = req.cookies['CustomerData'];
    res.render('login', {
        'customerData': customerData
    });
});


const getHashedPassword = (password) => {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return { hash, salt };
}

router.post('/register', (req, res) => {
    const { email, password, confirmPassword, name, lastName, phone, country, address, zipCode, company, cvr, companyType } = req.body;

    // Checks password
    if (password === confirmPassword) {

        // Checks if user is registered
        let customerRegistered
        axios.get('http://localhost:5000/customer/' + email)
            .then(res => {
                if (res.data.email) {
                    customerRegistered = true;
                    renderView();
                }
                else {
                    createCustomer();
                }
            }).catch(err => {
                console.log('Error: ', err.message);
            });

        function renderView() {
            res.render('login', {
                message: 'Bruger med mailen: ' + email + ' findes allerede',
            });
            return;
        }

        function createCustomer() {
            const hashedPassword = getHashedPassword(password);

            // Store user in DB
            axios.post('http://localhost:5000/customer/', {
                email: email,
                phone: phone,
                address: address,
                companyName: company,
                country: country,
                zipCode: zipCode,
                firstName: name,
                lastName: lastName,
                companyType: companyType,
                cvr: cvr,
                password: hashedPassword.hash,
                salt: hashedPassword.salt
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            res.render('login', {
                message: 'Oprettelse vellykket. Log ind nu.',
            });
        }

    }
});

async function checkPassword(email, password) {
    var bcrypt = require('bcryptjs');
    let hashedPassword = '';
    let customer = '';

    return await axios.get('http://localhost:5000/customer/' + email)
        .then(res => {
            if (res.data) {
                hashedPassword = bcrypt.hashSync(password, res.data.salt);
                customer = res.data;
            }
            return { hashedPassword, customer };
        }).catch(err => {
            console.log('Error: ', err.message);
        });
}

// Generates authtoken
const generateAuthToken = () => {
    const crypto = require('crypto');
    return crypto.randomBytes(30).toString('hex');
}


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const hashedPasswordAndCustomer = await checkPassword(email, password);
    const customer = hashedPasswordAndCustomer.customer;
    const hashedPassword = hashedPasswordAndCustomer.hashedPassword;

    console.log(customer);
    if (customer) {
        if (customer.email === email && hashedPassword === customer.password) {
            const authToken = generateAuthToken();

            await axios.post('http://localhost:5000/customer/authtoken', {
                authToken: authToken,
                customerID: customer.customerID
            }).then(() => {
                //max-age=${60 * 60 * 24 * 14}
                res.cookie('AuthToken', authToken);

                let customerData = {
                    "customerID": customer.customerID,
                    "phone": customer.phone,
                    "email": customer.email,
                    "address": customer.address,
                    "companyTypeID": customer.companyTypeID,
                    "countryID": customer.countryID,
                    "zipCode": customer.zipCode,
                    "createDate": customer.createDate,
                    "modifiedDate": customer.modifiedDate,
                    "firstName": customer.firstName,
                    "lastName": customer.lastName,
                    "companyName": customer.companyName,
                    "CVR": customer.CVR,
                }

                res.cookie('CustomerData', customerData);
                res.redirect('http://localhost:3000/');
            })
        }
    }
    else {
        res.render('login', {
            message: 'Ugyldigt brugernavn eller adgangskode'
        });
    }

})

router.post('/update', async (req, res) => {
    const { email, password, confirmPassword, name, lastName, phone, country, address, zipCode, company, cvr, companyType } = req.body;
    const authToken = req.cookies['AuthToken'];

    if (password != '' && password === confirmPassword && authToken) {
        const hashedPassword = getHashedPassword(password);

        // Updates user in DB
        axios.patch('http://localhost:5000/customer/', {
            authToken: authToken,
            email: email,
            phone: phone,
            address: address,
            companyName: company,
            country: country,
            zipCode: zipCode,
            firstName: name,
            lastName: lastName,
            companyType: companyType,
            cvr: cvr,
            password: hashedPassword.hash,
            salt: hashedPassword.salt
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        res.clearCookie('AuthToken');
        res.clearCookie('CustomerData');

        res.render('login', {
            message: 'Kundeoplysninger opdateret. Log ind!',
        });
    }
});

router.get('/logout', async (req, res) => {
    const authToken = req.cookies['AuthToken'];
    const customerData = req.cookies['CustomerData'];

    // Clears authtokens in DB
    axios.patch('http://localhost:5000/customer/' + customerData.customerID, {
        authToken: authToken,
    })
        .then(function (response) {
            console.log(response);
            res.clearCookie('AuthToken');
            res.clearCookie('CustomerData');
        })
        .catch(function (error) {
            console.log(error);
        });

    res.clearCookie('AuthToken');
    res.clearCookie('CustomerData');
    res.redirect('http://localhost:3000/');
});
module.exports = router;
