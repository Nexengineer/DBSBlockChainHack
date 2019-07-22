const express = require('express');
const router = express.Router();
const http = require('http')
var request = require('request');
const Sha256 = require('sha256')
const axios = require('axios');

// Api call to get all the customer
router.get('/', (req, res) => {
    request({
        uri: 'http://localhost:3000/api/test.Customer',
    }).pipe(res)
})

// Post API call for the adding customer
router.post('/', (req, res) => {
    const body = req.body.user;
    var newUSer = {
        customerId: body.customerId,
        name: body.name,
        dob: body.dob,
        address: body.address,
        emailAccount: body.emailAccount,
        operationRegion: body.operationRegion,
        privateHash: body.privateHash
    }

    axios.get('http://localhost:3000/api/test.Customer').then(response => {
        let array = response.data;
        // Filtering the array
        var filtered = array.filter(function (item) {
            return item.customerId == body.customerId;
        });

        if (filtered.length < 1) {
            // if account doesn't exist
            const newAccount = {
                accountId: newUSer.customerId,
                balance: 0
            }
            axios.post(`http://localhost:5000/api/account `, { accountId: newUSer.customerId,
                balance: parseInt(body.balance) }).then(response => {
                axios.post(`http://localhost:3000/api/test.Customer `, { customerId: body.customerId,
                name: body.name,
                dob: body.dob,
                address: body.address,
                emailAccount: body.emailAccount,
                operationRegion: body.operationRegion,
                privateHash: body.privateHash }).then(response => {
                    console.log(response)
                    let obj = {
                        status: 200,
                        message: "SucessFully Created"
                    }
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(obj));

                }).catch(error => {
                    let obj = {
                        status: 500,
                        message: "Already Exists"
                    }
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(obj)); 
                })
            }).catch(error => {
                let obj = {
                    status: 500,
                    message: "Already Exists"
                }
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(obj));             })
        } else {
            let obj = {
                status: 500,
                message: "Already Exists"
            }
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(obj));
        }
    })
})

// Get API call by id 



module.exports = router;


