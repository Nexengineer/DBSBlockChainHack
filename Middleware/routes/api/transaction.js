const express = require('express');
const router = express.Router();
var request = require('request');
const axios = require('axios')
const Sha256 = require('sha256')

// Get All 
router.get('/', (req, res) => {
    request({
        uri: 'http://localhost:3000/api/test.AccountTransfer',
    }).pipe(res)
});

router.post('/',(req, res) => {
    request('http://localhost:5000/api/account', function (error, response, body) {
        var array = JSON.parse(body)
        // Filtering the array
        var filterFrom = array.filter(function (item) {
            return item.accountId == req.body.from;
        });

        var filterTo = array.filter(function (item) {
            return item.accountId == req.body.to;
        });

        if (filterFrom.length > 0 && filterTo.length > 0 ) {
            let fromAccount = filterFrom[0];
            let toAccount = filterTo[0];
            let status = ""
            if (fromAccount.operationRegion == req.body.region) {
                status= 'Secure';
            } else {
                status = 'NeedApproval'
            }

            let amount = parseInt(req.body.amount);
            let fromString = "resource:test.Account#"+fromAccount.accountId
            let toString = "resource:test.Account#"+toAccount.accountId
            axios.post('http://localhost:3000/api/test.AccountTransfer' , {
                from: fromString,
                to: toString,
                status: status,
                amount: amount 
            }).then(response => {
                let obj = {
                    status: 200,
                    message: "Transcation Completed sucessfully"
                }
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(obj));
            }).catch(error => {
                console.log(error)
                let obj = {
                    status: 400,
                    message: "Unable to do transcation"
                }
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(obj));
            })
        } else {
            let obj = {
                status: 404,
                message: "Not Found"
            }
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(obj));
        }
    })
})

module.exports = router;
