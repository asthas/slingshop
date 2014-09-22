var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Parse setup
GLOBAL.Parse = require('parse').Parse;
Parse.initialize("W42PEkh5M824lpvx1FZsJxWBP6Eq7o9rvNHyJFP5", "5OA1f5vv9VbcCCT1reXAckJYPylUszIcRhDWUfT7");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Slingshot API' });
});

router.route('/bags')
	.get(function(req, res) {
		res.send('GET request for: bags');
	})
	.post(function(req, res) {
		res.send('POST request for: bags');
	});

app.use('/api', router);

module.exports = app;