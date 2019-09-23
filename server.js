const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
var Mailchimp = require('mailchimp-api-v3');

const APIKey = "68564f1829426ee6cb5419a57bbf17f8-us4";
var mailchimp = new Mailchimp(APIKey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files....
app.use(express.static(__dirname + '/dist/qr-code-app'));

// Send all requests to index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/qr-code-app/index.html'));
 // res.json("");
});
app.get('/api', function(req, res) {
  console.log(req.body);
  console.log(req.params);
  res.json({'type':'result'});
});
app.post('/api', function(req, res) {
  console.log(req.body);
  mailchimp.post('/lists/d08869bf49/members', {
    email_address : req.body.email,
    status : 'subscribed',
    merge_fields: {
        'FNAME': req.body.fname,
        'LNAME': req.body.lname,
        'PHONE': req.body.phone
    }
  })
  .then(function (result) {
    res.json({'result':'success'});
    console.log(result);
  })
  .catch(function (err) {
    res.json({'type':'result'});
    console.log(err);
  })
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
