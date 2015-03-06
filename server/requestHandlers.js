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
	response.end();

}

exports.register = register;
