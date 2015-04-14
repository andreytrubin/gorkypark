var models = require("./models");
var commons = require("./commons");
var validator = require("./tokenValidator");
var sequelize = require("sequelize");

function cartManagement(response, postData, authToken) {
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
	} else {
		console.log(postData);
		
		if (!validator.validateToken(response, authToken)) {
			return;
		}
		
		//Getting user login from authorization token
		var securityToken = commons.getToken(authToken, "Bearer ");
		
		//Searching such user in database
		models.User.find({where: {login: securityToken.user}}).then(function(user) {
			if(user == null) {
				commons.notFound("User not found", response);
				return;
			} else {
				//If user is defined, trying to find user's cart if it exists or create new one
				
				models.Cart.findOrCreate({where: {idUser: user.id}, defaults: {idUser: user.id}}).spread(function(cart, created) {
					var cartJson = commons.getJson(postData, response, commons.badRequest);
					if (cartJson == null) {
						commons.internalServerError("ERROR: File is empty", response);
						return;
					}
					var cartItem = [];
					cartItem = cartJson.items;
					cartItem.idCart = cart.id;
					
					//Dividing items by status
//					var itemsToAdd = [];
//					var itemsToUpdate = [];
//					var itemsToDelete = [];
//					for ( var i = 0; i < cartItem.length; i++) {
//						var item = cartItem[i];
//						if (item.status == "add") {
//							itemsToAdd[length] = item;
//						}
//						if (item.status == "update") {
//							itemsToUpdate[length] = item;
//						}
//						if (item.status == "delete") {
//							itemsToDelete[length] = item;
//						}
//					}

					for (var i = 0; i < cartItem.length; i++) {
						var item = cartItem[i];
						item.idCart = cart.id;
						
						
						if (item.status == undefined || item.status == null) {
							commons.badRequest("NO STATUS", response);
							return;
						}
						
						if(item.status == "add") {
							//For all items in incoming Json creating new item in Cart_Item table
							try {
								addItem(item);
							} catch (SequelizeUniqueConstraintError) {
								console.log(e.name);
								console.log(e.message);
								console.log(e.trace); 
							}
						}
						
						console.log(item);
						if(item.status == "update") {
							//For all items in incoming Json updating values
							updateItem(item);
						}
						
						if (item.status == "delete") {
							//For all items in incoming Json deleting rows
							deleteItem(item);
						}
					console.log("ITERATION COMPLETE");
					}
					commons.success(response, "{}");
				});		
			}	
		});
	}
}

function addItem(item){
	models.CartItem.create(item).then(function(newItem) {
		if (newItem != null) {
			console.log("INFO: New cartItem created");
		}
	});
}

function updateItem(item){
	models.CartItem.find({where: {idAttraction: item.idAttraction}}).then(function(newItem, item) {
		console.log(item);
		if (newItem != null) {
			newItem.updateAttributes({
				adultQuant: item.adultQuant,
				childQuant: item.childQuant
			});
		} else {
			console.log("ITEM NOT FOUND");
		}	
	});
}

function deleteItem(item){
	models.CartItem.destroy({where: {idAttraction: item.idAttraction}});
}

exports.cartManagement = cartManagement;
