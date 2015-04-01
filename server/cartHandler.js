var url = require("url");
var jwt = require('jwt-simple');
var moment = require("moment");

var models = require("./models");
var commons = require("./commons");

function validateToken(response, postData) {
	var incomingJson = null;
	
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
		return;
	} else {
		incomingJson = commons.getJson(postData, response, commons.badRequest);
		if (incomingJson == null) {
			return;
		}
	}
	
	var errorsJSON = validateData(incomingJson);
	if (errorsJSON.errors.length > 0) {
		commons.handleError(JSON.stringify(errorsJSON), response);
		return;
	}
	
	models.User.find({where: {login: incomingJson.user}}).then(function(user){
		if (user != null) {
			var time = moment().valueOf();
			if (time >= incomingJson.expires) {
				commons.forbidden("Access denied", response);
				return false;
			} else {
				var decoded = jwt.decode(incomingJson.token, user.salt);
				if (decoded.iss == incomingJson.user && decoded.exp == incomingJson.expires) {
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

function validateData(json) {
	var errors = [];
	if (json == null) {
		errors[errors.length] = "JSON object not supplied";
		return {
			"errors" : errors
		};
	}
	if (json.token == null || json.token == "") {
		errors[errors.length] = "Token must not be empty";
	}
	if (json.expires == null || json.expires == "") {
		errors[errors.length] = "Expires must not be empty";
	}	
	if (json.user == null || json.user == "") {
		errors[errors.length] = "User must not be empty";
	}
	return {
		"errors" : errors
	};
}

function currentDateToMySqlDate() {
	return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
exports.validateToken = validateToken;
