var request = require("request");
var fs = require("fs");

//jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

var SPEC_FILES = "spec/register/";

var registerAtrubin = JSON.parse(fs.readFileSync(SPEC_FILES+"registerAtrubin.json", "utf8"));
var registerAyasenov = JSON.parse(fs.readFileSync(SPEC_FILES+"registerAyasenov.json", "utf8"));
var registerInvalid = JSON.parse(fs.readFileSync(SPEC_FILES+"registerInvalid.json", "utf8"));

var registerUrl="http://localhost:8888/register";

xdescribe('Unregistered user processing', function() {
    it('Will proceed with user registration', function(done) {
        request.get(registerUrl, {json:true, body: registerAtrubin}, function(error, response, body) {
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(registerAtrubin);
            done();
        });
    });
});

describe('Registered user processing', function() {
    it('Will proceed with bad request code for registered user', function(done) {
    	var registerAyasenovResponse = JSON.parse(fs.readFileSync(SPEC_FILES+"registerAyasenovResponse.json", "utf8"));
    	
        request.get(registerUrl, {json:true, body: registerAyasenov}, function(error, response, body) {
            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual(registerAyasenovResponse);
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

