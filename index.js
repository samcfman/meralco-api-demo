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
const originWhitelist = ['http://localhost:5000', 'https://sman-apiendpt.herokuapp.com', 'https://sman-org-dev-ed.lightning.force.com'];

// middleware route that all requests pass through
/*router.use((request, response, next) => {
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
*/
// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({message: 'Hello, welcome to my server'});
});

const url = require('url');

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
