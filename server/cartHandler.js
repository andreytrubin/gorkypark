var models = require("./models");
var commons = require("./commons");
var validator = require("./tokenValidator");
var sequelize = require("sequelize");

function addToCart(response, postData){
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
	} else {
		console.log(postData);
		
		// FIXME: rename incomingJson to cartJson in order to be clear on names of variables.
		var incomingJson = commons.getJson(postData, response, commons.badRequest);
		if (incomingJson == null) {
			// TODO: properly handle error here.
			return;
		}

		models.User.find({where: {login: incomingJson.login}}).then(function(user) {
			if(user == null) {
				commons.notFound("User not found", response);
				return;
			} else {
				models.Cart.findOrCreate({where: {idUser: user.id}, defaults: {idUser: user.id}}).spread(function(cart, created) {
					// FIXME: DON'T ever modify the incoming data. Create a new object and work with it. Copy incoming data if required.
					incomingJson.idCart = cart.id;
					models.CartItem.create(incomingJson).then(function(newItem) {
						if (newItem != null) {
							console.log("INFO: New cartItem created");
							commons.success(response, "{}");
						}
					});
				});
			}	
		});
	}
}

exports.addToCart = addToCart;
