var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Parse setup
GLOBAL.Parse = require('parse').Parse;
Parse.initialize("KCMmkNOL6FldFtccbPRvXePY56qPwZtJIyHX83Cd", "oIyRZvtLFL648BxMX3PIYxVlVP94I29WG1IK4b03");
var Bags = Parse.Object.extend("bags");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();

function addBagToInventory(name, price, stock) {
	var bag = new Bags();
	bag.set("name", name);
	bag.set("price", parseInt(price));
	bag.set("stock", parseInt(stock));
	bag.save(null, {
	  success: function(bag) {
	    console.log('New object created with objectId: ' + bag.id);
	  },
	  error: function(bag, error) {
	    console.log('Failed to create new object, with error code: ' + error.message);
	  }
	});
}

function getInventory(res) {
	var query = new Parse.Query(Bags);
	query.greaterThan("stock", 0);

	query.find({
		success: function(bags) {
			res.json(bags);
		},
		error: function(error) {
			res.json( {error: "Out of stock!"} );
		}
	});
}

router.route('/')
	.get(function(req, res) {
    	res.json({ message: 'Slingshop API' });
    });

router.route('/bags')
	.get(function(req, res) {
		getInventory(res);
	})
	.post(function(req, res) {
		var name  = req.body.name,
			price = req.body.price;
			stock = req.body.stock;
		res.json({ message: 'Adding to inventory', name: name, price: price, stock: stock });
		addBagToInventory(name, price, stock);
	});

app.use('/api', router);

module.exports = app;