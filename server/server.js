var https = require("https");
var url = require("url");
var fs = require("fs");

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
			if (request.method == "GET") {
				route(handle, pathname, response, request);
			} else {
				route(handle, pathname, response, postData);
			}
		});
	}
	
	var hskey = fs.readFileSync('cert/park-key.pem');
	var hscert = fs.readFileSync('cert/park-cert.pem');
	var options = {
		    key: hskey,
		    cert: hscert
		};

	// Create server and listen on port 8888 
	https.createServer(options, onRequest).listen("8888");
	console.log("Server started");
}

exports.start = start;
