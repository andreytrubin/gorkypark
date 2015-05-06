var models = require("./models");
var commons = require("./commons");
var validator = require("./tokenValidator");
var sequelize = require("sequelize");
var async = require("async");

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
				models.Cart.findOrCreate({where: {idUser: user.id}, defaults: {idUser: user.id}}).spread(function(cart) {
					var cartJson = commons.getJson(postData, response, commons.badRequest);
					if (cartJson == null) {
						commons.internalServerError("ERROR: File is empty", response);
						return;
					}
					var cartItem = [];
					cartItem = cartJson.items;
					
					//Dividing items by status
					var itemsToAdd = [];
					var itemsToUpdate = [];
					var itemsToDelete = [];
					for ( var i = 0; i < cartItem.length; i++) {
						var item = cartItem[i];
						item.idCart = cart.id;
						if (item.status == "add") {
							itemsToAdd[itemsToAdd.length] = item;
						}
						if (item.status == "update") {
							itemsToUpdate[itemsToUpdate.length] = item;
						}
						if (item.status == "delete") {
							itemsToDelete[itemsToDelete.length] = item;
						}
					}
					//foreach for adding items
					async.each(itemsToAdd, addItem, function(err) {
						console.log(err);
					});
					//foreach for adding items
					async.each(itemsToUpdate, updateItem, function (err) {
						console.log(err);
					});
					//foreach for deleting items
					async.each(itemsToDelete, deleteItem, function(err) {
						console.log(err);
					});
					commons.success(response, "{}");
				}).catch(function(err) {
					console.log(err);
					console.log(err.stack);
				});
			}
		});
	}
}

function getCartItems(response, request){
	if (request == null || request == undefined) {
		commons.badRequest("Bad Request method", response);
		return;
	}
	var query = url.parse(request.url, true).query;
	
	if(query.id != null || query.id != undefined) {
		models.CartItem.findAll({where: {idCart: query.id}}).then(function(items){
		console.log(transformItems(items));
		commons.success(response, transformItems(items));	
		});
	}
}

function addItem(item, callback) {
	models.CartItem.create(item).then(function(newItem) {
		if (newItem != null) {
			console.log("INFO: New cartItem created");
		}
	}).catch(function(err) {
		console.log(err);
	});
}

function updateItem(item, callback) {
	console.log("Updating item " + item);
	models.CartItem.find({where: {idAttraction: item.idAttraction}}).then(function(newItem) {
		if (newItem != null) {
			newItem.updateAttributes({
				adultQuant: item.adultQuant,
				childQuant: item.childQuant
			});
		} else {
			console.log("ITEM NOT FOUND");
		}	
	}).catch(function(err) {
		console.log(err);
	});
}

function deleteItem(item, callback){
	console.log("Deleting items" + item);
	models.CartItem.destroy({where: {idAttraction: item.idAttraction}}).catch(function(err){
		console.log(err);
	});
}

function transformItems(items) {
	var result = [];
	for ( var i = 0; i < items.length; i++) {
		result[i] = items[i].dataValues;
	}
	return result;
}

exports.cartManagement = cartManagement;
exports.getCartItems = getCartItems;
