function isJson(postData, response) {
	var incomingJson;
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
};
exports.isJson = isJson;