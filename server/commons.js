function getJson(postData, response, handleError) {
	var incomingJson = null;
	try {
		incomingJson = eval('(' + postData + ')');
	} catch (err) {
		badRequest(err, response);
	}
	
	return incomingJson;
};

function badRequest(err, response) {
	handleError(err, 400, response);
}

function notFound(err, response) {
	handleError(err, 404, response);
}

function internalServerError(err, response) {
	handleError(err, 500, response);
}

function handleError(err, code, response) {
	console.log("ERROR: " + err);
	response.writeHead(code, {"Content-Type" : "text/json"});
	response.write(err);
	response.end();
}

exports.getJson = getJson;
exports.badRequest = badRequest;
exports.notFound = notFound;
exports.internalServerError = internalServerError;
