var querystring = require("querystring");
var fs = require("fs");
var models = require("./models");
// var jsonParser = require("./jsonParser");

function register(response, postData) {
	// check if request is empty
	// return 400
	if (postData == "") {
		console.log("ERROR: no content");
		response.writeHead(400, {
			"Content-Type" : "text/json"
		});
		response.end();
	} else {
		// check if user with username already exists
		// if the user already exists get error (return 400 bad request)

		// checking if incoming data is JSON
		var incomingJson = null;
		try {
			incomingJson = eval('(' + postData + ')');
		} catch (err) {
			console.log("ERROR: " + err);
			response.writeHead(400, {
				"Content-Type" : "text/json"
			});
			response.end();
			return 0;
		}
		// jsonParser.isJson(postData, response);

		// user validation and sending errors array if they are
		try {
			var errorsJSON = validateUser(incomingJson.user);
			console.log("==============" + errorsJSON.errors.length);
			if (errorsJSON.errors.length > 0) {
				throw new Error(JSON.stringify(errorsJSON));
			}
		} catch (e) {
			response.writeHead(400, {
				"Content-Type" : "text/json"
			});
			console.log(e);
			response.write(e.message);
			response.end();
			return 0;
		}

		var userLogin = incomingJson.user.login;

		console.log("INFO: Creating new user " + userLogin);
		var incomingUser = incomingJson.user;
		incomingUser.statusBanned = 0;

		models.Role.find({where : {name : "user"} }).then(function(role) {
			incomingUser.idRole = role.id;
			console.log("INCOMING USER IDROLE " + incomingUser.idRole);
			
			models.User.create(incomingUser).then(function(newUser) {
				console.log("INFO: New user created: " + newUser.login);
				response.writeHead(200);
				response.write(JSON.stringify(newUser));
				response.end();
			});
		});

		

	}
	// });

	// {
	// if (login != "ayasenov") {
	// // if user isn't exist then create it in db
	// // return 200
	//
	// console.log("user " + login + " not registered yet");
	// response.writeHead(200, {
	// "Content-Type" : "text/json"
	// });
	// response.write(JSON.stringify(incomingJson));
	// } else {

	// }
	// });

	// console.log(foundUser.login);
	// response.writeHead(400, {
	// "Content-Type" : "text/json"
	// });
	//			
	//			
	// }
}
// }

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

	var userLogin = user.login;
	var userEmail = user.email;

	// errors[errors.length] = models.User.find({ where: {login: userLogin}
	// }).then(function(newUser, errors) {
	// if (newUser != null) {
	// console.log("ERROR: User " + newUser.login + " already registered");
	// return ("User with such login already registered");
	// }
	// });
	//	
	// errors[errors.length] = models.User.find({ where: {email: userEmail}
	// }).then(function(newUser, errors) {
	// if (newUser != null) {
	// console.log("ERROR: Such email " + newUser.email + " already
	// registered");
	// return "User with such email already registered";
	//			
	// }
	// });
	return {
		"errors" : errors
	};
}
exports.register = register;