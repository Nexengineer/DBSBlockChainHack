// imported Modules
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

//Importing Route
const Account = require('./routes/api/account');
const Customer = require('./routes/api/customer');
const Transaction = require('./routes/api/transaction');
const User = require('./routes/api/user')
// Intiating App
const app = express();

// App uses bodyparser middleware
app.use(bodyParser.json());

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8081'}));


// Routes: This will be used for routes
// Order Routes
app.use('/api/account', Account);

// Customer Routes
app.use('/api/customer', Customer)

// Supplier Routes
app.use('/api/transaction', Transaction)

// Supplier Routes
app.use('/api/v1', User)


// This is the port setup
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));