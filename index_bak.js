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

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Hello World'));

// all routes prefixed with /api
app.use('/api', router);

app.use(bodyParser.json());

// this array is used for identification of allowed origins in CORS
const originWhitelist = ['http://localhost:5000', 'https://sman-apiendpt.herokuapp.com', 'https://sman-org-dev-ed.lightning.force.com'];

// middleware route that all requests pass through
router.use((request, response, next) => {
  console.log('Server info: Request received');

  let origin = request.headers.origin;
  console.log(origin);

  // only allow requests from origins that we trust
  if (originWhitelist.indexOf(origin) > -1) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }

  // only allow get requests, separate methods by comma e.g. 'GET, POST'
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);

  // push through to the proper route
  next();
});

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({message: 'Hello, welcome to my server'});
});

const url = require('url');

router.get('/stuff', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  // e.g. myVenues = 12;

//  var myResponse = `I multiplies the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
//  var myResponse = '({txns: {}})';

  var txns = 'txns:' +  '['
  +   '{ "date":xxxx, "Amount":10000 },'
  +   '{ "date":xxx, "Amount":200 ] },'
  +   '{ "date":xxx, "Amount":500 ] }'
  + ']';

  response.json({message: txns});
});

router.get('/stuffv1', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  // e.g. myVenues = 12;

  var myResponse = `I multiplies the number you gave me (${myParam}) by 10s and got: ${myParam * 10}`;

  response.json({message: myResponse});
});

router.Post('/createinvoice', (request, response) => {
//  var bodyParser = require('body-parser');

  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  // e.g. myVenues = 12;

  var myResponse = `I multiplies the number you gave me (${myParam}) by 10s and got: ${myParam * 10}`;

  response.json({message: myResponse});
});

router.post('/createinvoice',(req,res)=>{
  var body=req.body;
  var price = body.price;
  var status = body.status;
  var vin = body.vin;
  var customer = body.customer;

  client.query('INSERT INTO invoices (vin, status, price, customer) VALUES ($1, $2, $3, $4)', [vin, status, price, customer], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Invoice added with ID: ${result.invoiceId}`)
  })

});

// set the server to listen on port 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
