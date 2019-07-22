const express = require('express');
const router = express.Router();
var request = require('request');
const axios = require('axios');

router.get('/', (req, res) => {
    request({
        uri: 'http://localhost:3000/api/test.Account',
    }).pipe(res)
});

router.post('/', (req, res) => {
    const body = req.body
    var obj = {
        accountId: body.accountId,
        balance: body.balance,
    }

    request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        uri: 'http://localhost:3000/api/test.Account',
        body: JSON.stringify(obj)
    }).pipe(res)
})

module.exports = router;
