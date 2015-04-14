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

function forbidden(err, response) {
	handleError(err, 403, response);
}

function handleError(err, code, response) {
	console.log("ERROR: " + err);
	response.writeHead(code, {"Content-Type" : "text/json"});
	response.write(err);
	response.end();
}

function success(response, content) {
	response.writeHead(200, {"Content-Type" : "text/json"});
	if (content != null){
		response.write(JSON.stringify(content));
	}
	console.log(content);
	response.end();	
}

function getToken(token, incomeString) {
	var objectString = token.slice(incomeString.length);
	var securityToken = JSON.parse(objectString);
	return securityToken;
}

exports.getJson = getJson;
exports.badRequest = badRequest;
exports.notFound = notFound;
exports.internalServerError = internalServerError;
exports.success = success;
exports.forbidden = forbidden;
exports.getToken = getToken;
