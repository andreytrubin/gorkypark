var http = require("http");
var url = require("url");
var models = require("./models");

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

	// Create server and listen on port 8888 
	http.createServer(onRequest).listen("8888");
	console.log("Server started");
}

exports.start = start;
