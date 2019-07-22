const express = require('express');
const router = express.Router();
var request = require('request');
const axios = require('axios');
const Sha256 = require('sha256')

router.get('/:id',(req, res) => {
    request('http://localhost:3000/api/test.Customer', function (error, response, body) {
    // Handle errors properly.
    if (error || response.statusCode !== 200) {
      return res.writeHead(error ? 500 : response.statusCode);
    }

    var array = JSON.parse(body)
    var filtered=array.filter(function(item){
        return item.customerId==req.params.id;         
    });

    if (filtered.length> 0) {
        let obj = {
            status: 200,
            name: filtered[0].name,
            dob: filtered[0].dob,
            address: filtered[0].dob,
            emailAccount: filtered[0].emailAccount,
            hashKey: Sha256(filtered[0].customerId + filtered[0].privateHash),
            publicKey: filtered[0].customerId 
        }
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(obj));
    } else {
        let obj = {
            status: 404,
            message: "No records found"
        }
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(obj));
    }
    
  });
})

module.exports = router;


