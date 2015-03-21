var querystring = require("querystring");
var fs = require("fs");
var models = require("./models");
var commons = require("./commons");


function register(response, postData) {
	// (1) check if request is empty return 400
	if (postData == "") {
		commons.badRequest("ERROR: no content", response);
	} else {
		// check if user with username already exists
		// if the user already exists get error (return 400 bad request)

		// (2) checking if incoming data is JSON
		var incomingJson = commons.getJson(postData, response, commons.badRequest);
		if (incomingJson == null) {
			return;
		}
		
		// (3) user validation and sending errors array if they are
		var errorsJSON = validateUser(incomingJson.user);
		if (errorsJSON.errors.length > 0) {
			commons.handleError(JSON.stringify(errorsJSON), response);
			return;
		}
		
		var incomingUser = incomingJson.user;		
		var userLogin = incomingUser.login;
		var userEmail = incomingUser.email;
		
		// (4) Try to find by login OR email
		models.User.find({where: {login: userLogin, $or: {email: userEmail}}}).then(function(user, errors) {
			if (user != null) {
				commons.badRequest("User login " + userLogin + " already registered", response);
			} else {
				console.log("INFO: Creating new user: " + userLogin);
				// (6) Find role
				models.Role.find({where : {name : "user"} }).then(function(role) {
					if (role != null) {
						console.log(role.dataValues);
						incomingUser.idRole = role.id;
						incomingUser.statusBanned = 0;
						incomingUser.regDate = currentDateToMySqlDate();
						
						// (7) Create user that does not exist yet
						models.User.create(incomingUser).then(function(newUser, errors) {
							if (newUser != null) {
								newUser.roleName = "user";
								
								console.log("INFO: New user created: " + newUser.login);
								response.writeHead(200);
								response.write(JSON.stringify(newUser));
								response.end();
							} else {
								commons.internalServerError(errors, response);
							}
						});
					} else {
						commons.notFound("Role not found", response);
					}
				});
			}
		});
	}
}

function currentDateToMySqlDate() {
	return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

function validateUser(user) {
	var errors = [];
	if (user == null) {
		errors[errors.length] = "User object not supplied";
		return {
			"errors" : errors
		};
	}
	if (user.login == null || user.login == "") {
		errors[errors.length] = "Login must not be empty";
	}
	if (user.password == null || user.password == "") {
		errors[errors.length] = "Password must not be empty";
	}
	if (user.firstName == null || user.firstName == "") {
		errors[errors.length] = "First name must not be empty";
	}
	if (user.lastName == null || user.lastName == "") {
		errors[errors.length] = "Last name must not be empty";
	}
	if (user.email == null || user.email == "") {
		errors[errors.length] = "Email must not be empty";
	}
	if (user.birthDate == null || user.birthDate == "") {
		errors[errors.length] = "Birthdate must not be empty";
	}

	
	return {
		"errors" : errors
	};
}
exports.register = register;
