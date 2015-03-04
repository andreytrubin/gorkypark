var http = require("http");
var url = require("url");
var Sequelize = require('sequelize');

// Module function to export
function start(route, handle) {
	// Our request handler (I don't like anonymous functions)
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");
		
		request.setEncoding("utf8");
		
		// Data listener
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});

		// End listener
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}

	// Create connection pool to database
	var sequelize = new Sequelize("park", "park", "park", {
			host: "localhost",
			port: "3306",
			dialect: "mysql",
			pool: {
				max: 5,
				min: 1,
				idle: 10000
			}
		}
	);
	
	// User model
	var User = sequelize.define("user", {
		id : {
			type : Sequelize.INTEGER,
			field: "idUser",
			primaryKey: true,
			autoIncrement: true
		},
		login : {
			type : Sequelize.STRING,
			field : "login"
		},
		firstName : {
			type : Sequelize.STRING,
			field : "first_name"
		},
		lastName : {
			type : Sequelize.STRING,
			field : "last_name"
		}
	}, {
		tableName: 'user'
	});
	
	User.find({ where: {login: 'ayasenov'}, attributes: ["login", "firstName", "lastName"] }).then(function(user) {
		console.log("User: " + user.login + " " + user.firstName + " " + user.lastName);
	});
	
	// Create server and listen on port 8888 
	http.createServer(onRequest).listen("8888");
	console.log("Server started");
}

exports.start = start;
