const express = require('express');
const app = express();
const router = express.Router();
//const port = 3000;
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const { Client } = require ('pg');

const client = new Client ({
  connectionString: process.env.DATABASE_URL,
  ssl:true,
});

client.connect();

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Hello World'));

// all routes prefixed with /api
app.use('/api', router);



// this array is used for identification of allowed origins in CORS
//const originWhitelist = ['http://localhost:5000', 'https://sman-apiendpt.herokuapp.com', 'https://sman-org-dev-ed.lightning.force.com'];


router.get('/', (request, response) => {
  response.json({message: 'Hello, welcome to my server'});
});

const url = require('url');

router.post('/accountserviceactivation',(req,res)=>{
//  console.log(req.body);
  var body=req.body;

  var customerid = body.customerId;
  var sin =body.SIN;
  var contractId = body.contractId;
  //var eventdate timestamp,
  var servicestatus =body.servicestatus;

  res.status(200).send(`account activation: ` + customerid + '-' + sin + '-' + contractId + '-' +servicestatus);

//  client.query('INSERT INTO billing_events (eventtype, customerid, sin_no, message, eventdate) VALUES ($1, $2, $3, $4, $5) RETURNING eventid', [eventtype, customerid, sin_no, message, eventdate], (error, results) => {
//    if (error) {
//      throw error
//    }
//    res.status(201).send(`billing events added with ID: ${results.rows[0].eventid}`)
//  })
});

router.post('/paymenttopup',(req,res)=>{
//  console.log(req.body);
  var body=req.body;

  var customerid = body.customerId;
  var sin =body.SIN;
  var contractId = body.contractId;
  //var eventdate timestamp,
  var topupDateTime =body.topupDateTime;
  var topupAmount = body.topupAmount;
  var topupAmountCurrency = body.topupAmountCurrency;
  var topupKWh = body.topupKWh;
  var updatedTotalAmount = body.updatedTotalAmount;

  res.status(200).send(`payment topup: ` + customerid + '-' + sin + '-' + contractId + '-' +
  topupDateTime + '-' + topupAmount + '-' + topupAmountCurrency + '-' + topupKWh + '-' + updatedTotalAmount
  );

//  client.query('INSERT INTO billing_events (eventtype, customerid, sin_no, message, eventdate) VALUES ($1, $2, $3, $4, $5) RETURNING eventid', [eventtype, customerid, sin_no, message, eventdate], (error, results) => {
//    if (error) {
//      throw error
//    }
//    res.status(201).send(`billing events added with ID: ${results.rows[0].eventid}`)
//  })
});


router.post('/lowbalancenotification',(req,res)=>{
//  console.log(req.body);
  var body=req.body;

  var customerid = body.customerId;
  var sin =body.SIN;
  var contractId = body.contractId;
  //var eventdate timestamp,
  var lowBalanceDateTime =body.lowBalanceDateTime;
  var currentBalanceAmount = body.currentBalanceAmount;
  var currentBalanceAmountCurrency = body.currentBalanceAmountCurrency;
  var notificationMessage = body.notificationMessage;

  res.status(200).send(`low balance notification: ` + customerid + '-' + sin + '-' + contractId + '-' +
  lowBalanceDateTime + '-' + currentBalanceAmount + '-' + currentBalanceAmountCurrency + '-' + notificationMessage
  );

//  client.query('INSERT INTO billing_events (eventtype, customerid, sin_no, message, eventdate) VALUES ($1, $2, $3, $4, $5) RETURNING eventid', [eventtype, customerid, sin_no, message, eventdate], (error, results) => {
//    if (error) {
//      throw error
//    }
//    res.status(201).send(`billing events added with ID: ${results.rows[0].eventid}`)
//  })
});

router.post('/disconnectnotification',(req,res)=>{
//  console.log(req.body);
  var body=req.body;

  var customerid = body.customerId;
  var sin =body.SIN;
  var contractId = body.contractId;
  //var eventdate timestamp,
  var disconnectDateTime =body.disconnectDateTime;
  var currentAmount = body.currentAmount;
  var currentAmountCurrency = body.currentAmountCurrency;
  var messageType = body.messageType;

  res.status(200).send(`low balance notification: ` + customerid + '-' + sin + '-' + contractId + '-' +
  disconnectDateTime + '-' + currentAmount + '-' + currentAmountCurrency + '-' + messageType
  );

//  client.query('INSERT INTO billing_events (eventtype, customerid, sin_no, message, eventdate) VALUES ($1, $2, $3, $4, $5) RETURNING eventid', [eventtype, customerid, sin_no, message, eventdate], (error, results) => {
//    if (error) {
//      throw error
//    }
//    res.status(201).send(`billing events added with ID: ${results.rows[0].eventid}`)
//  })
});

router.post('/servicemeteractivation',(req,res)=>{
//  console.log(req.body);
  var body=req.body;

  var customerid = body.customerId;
  var sin =body.SIN;
  var contractId = body.contractId;
  //var eventdate timestamp,
  var activateDateTime =body.activateDateTime;
  var currentBalance = body.currentBalance;
  var currentBalanceCurrency = body.currentBalanceCurrency;
  var messageType = body.messageType;

  res.status(200).send(`low balance notification: ` + customerid + '-' + sin + '-' + contractId + '-' +
  disconnectDateTime + '-' + currentAmount + '-' + currentAmountCurrency + '-' + messageType
  );

//  client.query('INSERT INTO billing_events (eventtype, customerid, sin_no, message, eventdate) VALUES ($1, $2, $3, $4, $5) RETURNING eventid', [eventtype, customerid, sin_no, message, eventdate], (error, results) => {
//    if (error) {
//      throw error
//    }
//    res.status(201).send(`billing events added with ID: ${results.rows[0].eventid}`)
//  })
});

// set the server to listen on port 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
