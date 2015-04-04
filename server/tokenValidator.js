var url = require("url");
var jwt = require('jwt-simple');
var moment = require("moment");

var models = require("./models");
var commons = require("./commons");

function validateToken(resonse, request) {

		var header = request.headers["authorization"];
    	var objectString = header.slice(7);
    	var securityToken = JSON.parse(objectString);
	
	models.User.find({where: {login: securityToken.user}}).then(function(user){
		if (user != null) {
			var time = moment().valueOf();
			if (time >= securityToken.expires) {
				commons.forbidden("Access denied", response);
				return false;
			} else {
				var decoded = jwt.decode(securityToken.token, user.salt);
				if (decoded.iss == securityToken.user && decoded.exp == securityToken.expires) {
					commons.success(response, {});
					return true;
				}
			}
		} else {
			commons.notFound("No such user in database", recponse);
			return;
		}
	});	
}	

exports.validateToken = validateToken;
