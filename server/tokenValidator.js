var url = require("url");
var jwt = require('jwt-simple');
var moment = require("moment");

var models = require("./models");
var commons = require("./commons");
var exceptions = require("./exceptions");

function validateToken(resonse, authToken) {
	try {
		authorize(authToken);
	} catch (e) {
		if (e.name == "AccessDenied") {
			commons.forbidden(e.message, response);
		}
		
		if (e.name == "InvalidUser") {
			commons.notFound(e.message, response);
		}
		
		return false;
	}
	
	return true;
}

function authorize(authToken) {
	var objectString = authToken.slice(7);
	var securityToken = JSON.parse(objectString);
	
	models.User.find({where: {login: securityToken.user}}).then(function(user) {
		if (user != null) {
			var time = moment().valueOf();
			if (time >= securityToken.expires) {
				throw new exceptions.AccessDenied("Access denied for user: " + securityToken.user);
			} else {
				var decoded = jwt.decode(securityToken.token, user.salt);
				if (decoded.iss == securityToken.user && decoded.exp == securityToken.expires) {
					return;
				}
			}
		} else {
			throw new exceptions.InvalidUser("Invalid user: " + securityToken.user);
		}
	});
}

exports.validateToken = validateToken;
