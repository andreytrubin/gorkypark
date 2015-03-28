var url = require("url");
var crypto = require("crypto");
var rand = require('csprng');
var jwt = require('jwt-simple');
var moment = require("moment");

var models = require("./models");
var commons = require("./commons");

function authenticate(response, postData) {
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
	var time = currentDateToMySqlDate();
	models.User.find({where : {login : incomingJson.login}}).then(function(user) {
				if (user != null) {
					var password = user.salt + incomingJson.password;
					var passwordHash = crypto.createHash('sha256').update(
							password).digest("hex");
					if (passwordHash == user.password) {
						generateSecurityToken(response, user, time);
						
						user.updateAttributes({
							lastAuth : time
						});
					} else {
						commons.forbidden("User login or password not found",
								response);
					}
				} else {
					commons.forbidden("User login or password not found",
							response);
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

function generateSecurityToken(response, user, time) {
	var expires = moment(time).add(30, 'minutes').valueOf();
	console.log(expires);
	var token = jwt.encode({
		iss : user.login,
		exp : expires
	}, user.salt);

	commons.success(response, {
		token : token,
		expires : expires,
		user : user.login
	});
}

function currentDateToMySqlDate() {
	return new Date().toISOString().slice(0, 19).replace('T', ' ');
	var expires = moment().add(30, 'minutes').valueOf();
	console.log(expires);
}
exports.authenticate = authenticate;
