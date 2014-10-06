var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./api');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.sendfile('./app/public/index.html');
	});

router.route('/api')
	.get(function(req, res) {
    	res.jsonp({ message: 'Slingshop API' });
    });

router.route('/api/bags')
	.get(function(req, res) {
		api.getInventory(res);
	})
	.post(function(req, res) {
		var name  = req.body.name,
			price = req.body.price;
			stock = req.body.stock;
		res.jsonp({ message: 'Adding to inventory', name: name, price: price, stock: stock });
		api.addBagToInventory(name, price, stock);
	});

router.route('/api/buy/:id')
	.get(function(req, res) {
		api.addToCart(req.params.id, res);
	});

app.use('/', router);

module.exports = app;