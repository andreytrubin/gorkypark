var querystring = require("querystring");
var fs = require("fs");

function register(response, postData) {
	// check if request is empty
	// return 400
	if (postData == "") {
		console.log("ERROR: no content");
		response.writeHead(400, {
			"Content-Type" : "text/json"
		});
	} else {
		// check if user with username already exists
		// if the user already exists get error (return 400 bad request)
		var incomingJson = null;
		try {
			incomingJson = eval('(' + postData + ')');
		} catch (err) {
			console.log("ERROR: " + err);
			response.writeHead(400, {
				"Content-Type" : "text/json"
			});
			response.end();
		}
		try {
			var errors = validateUser(incomingJson.user);
			if (errors.length > 0) {
				throw new Error(errors);
			}
		} catch (e) {
			response.writeHead(400, {
				"Content-Type" : "text/json"
			});
			response.write(e.errors);
			response.end();
		}

		var login = incomingJson.user.login;

		if (login != "ayasenov") {
			// if user isn't exist then create it in db
			// return 200

			console.log("user " + login + " not registered yet");
			response.writeHead(200, {
				"Content-Type" : "text/json"
			});
			response.write(JSON.stringify(incomingJson));
		} else {
			console.log("ERROR: user " + login + " already registered");
			response.writeHead(400, {
				"Content-Type" : "text/json"
			});
			response.write(JSON.stringify(incomingJson));
		}

	}

	/*var User = models.User;
	
	User.find({ where: {login: 'ayasenov'}, attributes: ["login", "firstName", "lastName"] }).then(function(user) {
		console.log("User: " + user.login + " " + user.firstName + " " + user.lastName);
	});*/
	response.end();

}

function validateUser(user) {
	var errors = [];
	if (user == null) {
		errors[errors.length] = "User object not supplied";
		return errors;
	}
	if (user.login == null || user.login == "" ) {
		errors[errors.length] = "Login must not be empty";
	}
	if (user.password == null || user.password == "" ) {
		errors[errors.length] = "Password must not be empty";
	}
	if (user.firstName == null || user.firstName == "" ) {
		errors[errors.length] = "First name must not be empty";
	}
	if (user.lastName == null || user.lastName == "" ) {
		errors[errors.length] = "Last name must not be empty";
	}
	if (user.email == null || user.email == "" ) {
		errors[errors.length] = "Email must not be empty";
	}
	if (user.birthDate == null || user.birthDate == "" ) {
		errors[errors.length] = "Birthdate must not be empty";
	}
	return errors;
}
exports.register = register;