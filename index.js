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

  var customerid = body.customerid;
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

router.post('/billing_events',(req,res)=>{
//  console.log(req.body);
  var body=req.body;

  var eventtype = body.eventtype;
  console.log('datetime');
  console.log(body.eventdate);
  var customerid = body.customerid;
  var sin_no =body.sin_no;
  var eventdate = body.eventdate;
  //var eventdate timestamp,
  var message =body.message;

  client.query('INSERT INTO billing_events (eventtype, customerid, sin_no, message, eventdate) VALUES ($1, $2, $3, $4, $5) RETURNING eventid', [eventtype, customerid, sin_no, message, eventdate], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`billing events added with ID: ${results.rows[0].eventid}`)
  })
});

// set the server to listen on port 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
