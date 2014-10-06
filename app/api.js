//Parse setup
GLOBAL.Parse = require('parse').Parse;
Parse.initialize("KCMmkNOL6FldFtccbPRvXePY56qPwZtJIyHX83Cd", "oIyRZvtLFL648BxMX3PIYxVlVP94I29WG1IK4b03");
var Bags = Parse.Object.extend("bags");

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
			res.jsonp(bags)
		},
		error: function(error) {
			res.jsonp( {error: "Out of stock!"} );
		}
	});
}

function addToCart(id, res) {
	var query = new Parse.Query(Bags);
	query.get(id, {
	  success: function(bag) {
	  	if(bag.get('stock') > 0) {
	  		bag.increment('stock', -1);
	  		bag.save();
	  		res.jsonp( {status: 200, message: 'Added to cart!'} );
	  	} else {
	  		res.jsonp( {status: 500, message: 'Out of stock!'});
	  	}
	  },
	  error: function(object, error) {
	    res.jsonp( {status: 404, message: 'Item not found!'} );
	  }
	});
}

exports.addBagToInventory  = addBagToInventory;
exports.getInventory       = getInventory;
exports.addToCart          = addToCart