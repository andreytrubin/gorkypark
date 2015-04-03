var models = require("./models");
var commons = require("./commons");
var validator = require("./tokenValidator");
var sequelize = require("sequelize");

function addToCart(response, postData){
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
	} else {
		console.log(postData);
		var incomingJson = commons.getJson(postData, response, commons.badRequest);
		if (incomingJson == null) {
			return;
		}
		models.User.find({where: {login: incomingJson.login}}).then(function(user) {
			if(user == null) {
				commons.notFound("User not found", response);
				return;
			} else {
				models.Cart.findOrCreate({where: {idUser: user.id}, defaults: {idUser: user.id}}).spread(function(cart, created){
					
					var cartItem = incomingJson;
					cartItem.idCart = cart.id;
					cartItem.adult_quant = 2;
					cartItem.child_quant = 2;
					console.log(cartItem);
					models.CartItem.create(cartItem).then(function(newItem, errors){
						if (newItem != null) {
							
							console.log("INFO: New cartItem created");
							response.writeHead(200);
							response.end();
						}
					});
				});
			}	
		});
	}
}

exports.addToCart = addToCart;
