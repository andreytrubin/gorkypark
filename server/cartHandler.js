var models = require("./models");
var commons = require("./commons");
var validator = require("./tokenValidator");
var sequelize = require("sequelize");

function addToCart(response, postData, authToken) {
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
	} else {
		console.log(postData);
		
		if (!validator.validateToken(response, authToken)) {
			return;
		}
		
		var cartJson = commons.getJson(postData, response, commons.badRequest);
		if (cartJson == null) {
			commons.internalServerError("ERROR: File is empty", response);
			return;
		}
		
		//Getting user login from authorization token
		var objectString = authToken.slice(7);
		var securityToken = JSON.parse(objectString);
		
		//Searching such user in database
		models.User.find({where: {login: securityToken.user}}).then(function(user) {
			if(user == null) {
				commons.notFound("User not found", response);
				return;
			} else {
				//If user is defined, trying to find user's cart if it exists or create new one
				models.Cart.findOrCreate({where: {idUser: user.id}, defaults: {idUser: user.id}}).spread(function(cart, created) {
					var cartItem = [];
					cartItem = cartJson.items;
					cartItem.idCart = cart.id;
					for (var i = 0; i < cartItem.length; i++) {
						cartItem[i].idCart = cart.id;
						
						if(cartItem[i].status == "add") {
							//For all items in incoming Json creating new item in Cart_Item table
							models.CartItem.create(cartItem[i]).then(function(newItem) {
								if (newItem != null) {
									console.log("INFO: New cartItem created");
								}
							});
						}
						
						if(cartItem[i].status == "update") {
							//For all items in incoming Json updating values
							models.CartItem.find({where: {idAttraction: cartItem[i].idAttraction}}, cartItem[i]).then(function(item) {
								if (item != null) {
									item.updateAttributes({
										adultQuant: cartItem[i].adultQuant,
										childQuant: cartItem[i].childQuant
									});
								} else {
									console.log("ITEM IS NOT FIND");
								}	
							});
						}
						
						if (cartItem[i].status == "delete") {
							//For all items in incoming Json deleting rows
							models.CartItem.destroy({where: {idAttraction: cartItem[i].idAttraction}});
						}
					}
					commons.success(response, "{}");
				});		
			}	
		});
	}
}

exports.addToCart = addToCart;
