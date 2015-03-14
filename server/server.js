var http = require("http");
var url = require("url");
var querystring = require("querystring");

// Module function to export
function start(route, handle) {
	// Our request handler (I don't like anonymous functions)
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");
		
		
		
		
//		query = querystring.parse(pathname);
//		console.log(query);

		request.setEncoding("utf8");

		// Data listener
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});

		// End listener
		request.addListener("end", function() {
			if (request.method == "GET") {
				route(handle, pathname, response, request);
			} else {
				route(handle, pathname, response, postData);
			}
		});
	}

	// Create server and listen on port 8888 
	http.createServer(onRequest).listen("8888");
	console.log("Server started");
}

exports.start = start;
