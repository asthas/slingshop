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
// =============================================================================
var router = express.Router();              // get an instance of the express Router

function savetoparse(str) {
	var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({query: str}, {
      success: function(object) {
      	console.log("Saved: " + str);
      },
      error: function(model, error) {
      	console.log("Failed!");
      }
    });
}

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Slingshot API' });
});

router.get('/save/:str', function(req, res) {
	res.json({ str: req.params.str});
    savetoparse(req.params.str);
});

app.use('/api', router);

module.exports = app;