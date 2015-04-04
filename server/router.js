function route(handle, pathname, response, postData, authToken) {
	if (typeof handle[pathname] === 'function') {
		console.log("About to route a request for " + pathname);
		if (authToken) {
			console.log("Auth token received: " + authToken);
			handle[pathname](response, postData, authToken);
		} else {
			console.log("No auth token received");
			handle[pathname](response, postData);
		}
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type" : "text/plain"});
		response.write("404 Not Found");
		response.end();
	}
}

exports.route = route;
