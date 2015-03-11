var request = require("request");
var fs = require("fs");
var SPEC_FILES = "spec/register/";

function getContent(path) {
	var result = JSON.parse(fs.readFileSync(SPEC_FILES + path, "utf8"));
	return result;
}

var registerAtrubin = getContent("registerAtrubin.json");
var registerAyasenov = getContent("registerAyasenov.json");
var registerInvalid = getContent("registerInvalid.json");

var registerUrl = "http://localhost:8888/register";

describe('Unregistered user processing', function() {
    it('Will proceed with user registration', function(done) {
        request.get(registerUrl, {json:true, body: registerAtrubin}, function(error, response, body) {
        	var registerAtrubinResponse = getContent("registerAtrubinResponse.json");
        	console.log(response.body);
            var user = body;
            
        	expect(response.statusCode).toEqual(200);
            expect(user.login).toEqual(registerAtrubinResponse.login);
            expect(user.email).toEqual(registerAtrubinResponse.email);
            done();
        });
    });
});

xdescribe('Registered user processing', function() {
    it('Will proceed with bad request code for registered user', function(done) {
//    	var registerAyasenovResponse = JSON.parse(fs.readFileSync(SPEC_FILES+"registerAyasenovResponse.json", "utf8"));
        request.get(registerUrl, {json:true, body: registerAyasenov}, function(error, response, body) {
            expect(response.statusCode).toEqual(400);
//            expect(response.body).toEqual(registerAyasenovResponse);
            done();
        });
    });
});

xdescribe('User validation', function() {
    it('Will proceed with bad request code for invalid user', function(done) {
        request.get(registerUrl, {json:true, body: registerInvalid}, function(error, response, body) {
            expect(response.statusCode).toEqual(400);
            var expectedResult = JSON.parse(fs.readFileSync(SPEC_FILES+"registerInvalidResponse.json", "utf8"));
            expect(response.body).toEqual(expectedResult);
            done();
        });
    });
});
