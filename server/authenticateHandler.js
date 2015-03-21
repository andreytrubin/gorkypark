var url = require("url");
var crypto = require("crypto");
var rand = require('csprng');

var models = require("./models");
var commons = require("./commons");

function authenticate(response, postData) {
	var incomingJson = null;
	
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
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
	
	models.User.find({where: {login: incomingJson.login}}).then(function(user){
		if (user != null) {
			var password = user.salt + incomingJson.password;
			var passwordHash = crypto.createHash('sha256').update(password).digest("hex");
			console.log(user.salt);
			console.log(passwordHash);
			console.log(user.password);
			if(passwordHash == user.password){
				commons.success(response, "{}");	
			} else {
				commons.forbidden("User login or passwod not found", response);
			}
		} else {
			commons.forbidden("User login or passwod not found", response);
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
	if (json.login == null || json.login == "") {
		errors[errors.length] = "Login must not be empty";
	}
	if (json.password == null || json.password == "") {
		errors[errors.length] = "Password must not be empty";
	}	
	return {
		"errors" : errors
	};
}

exports.authenticate = authenticate;