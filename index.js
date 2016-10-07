var request = require ('request');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname});
});

app.post('/', function(req, res){
	console.log('Request received method:', req.body.method, ', url:', req.body.url, ', body:', req.body);

	request({
    url: req.body.url, //URL to hit
    // qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: req.body.method,
    //Lets post the following key/values as form
    json: JSON.stringify(req.body)
}, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode, body);
      res.json(body);
		}
	});
});


app.listen(PORT, function() {
  console.log('Server started on port: ' + PORT);
  console.log('Script is located at: ' + __dirname);
});

//Lets configure and request


