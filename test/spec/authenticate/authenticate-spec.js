process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var request = require("request");
var fs = require("fs");
var SPEC_FILES = "spec/authenticate/";
var authenticateUrl = "https://localhost:8888/authenticate";

function getContent(path) {
	var result = JSON.parse(fs.readFileSync(SPEC_FILES + path, "utf8"));
	return result;
}

var authenticateSuccess = getContent("authenticateSuccess.json");
var unregisteredUser = getContent("unregisteredUser.json");
var authenticateFailed = getContent("authenticateFailed.json");

describe('Success user authentification', function() {
    it('Will return 200', function(done) {
    	request.post(authenticateUrl, {json:true, body: authenticateSuccess}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(200);
        done();
    });
});
});

xdescribe('Failed user authentification', function() {
    it('Will return 403', function(done) {
    	request.post(authenticateUrl, {json:true, body: authenticateFailed}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(403);
        done();   
    });
});
});

xdescribe('User does not exist', function() {
    it('Will return 403', function(done) {
    	request.post(authenticateUrl, {json:true, body: unregisteredUser}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(403);
        done();   
    });
});
});


