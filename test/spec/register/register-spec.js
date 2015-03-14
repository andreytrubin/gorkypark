var request = require("request");
var fs = require("fs");
var mysql = require("mysql");
var SPEC_FILES = "spec/register/";

function getContent(path) {
	var result = JSON.parse(fs.readFileSync(SPEC_FILES + path, "utf8"));
	return result;
}

function executeMySqlQuery(query, callback){
	var connection = mysql.createConnection({
		host: "localhost",
		port: "3306",
		database: "park",
		user: "park",
		password: "park"
	});
	connection.connect();
	connection.query(query, function(err, result){
		if(err){
			callback(err);
			connection.end();
		} else{
			callback(result);
			connection.end();
		}
	});	
}

var registerAtrubin = getContent("registerAtrubin.json");
var registerAyasenov = getContent("registerAyasenov.json");
var registerInvalid = getContent("registerInvalid.json");

var registerUrl = "http://localhost:8888/register";

xdescribe('Unregistered user processing', function() {
	beforeEach(function(){
//		 var post = {login: "atrubin"};
         executeMySqlQuery("DELETE FROM user WHERE login = 'atrubin'", function(result){
         	console.log(result);
         });
	});
	
    it('Will proceed with user registration', function(done) {
        request.get(registerUrl, {json:true, body: registerAtrubin}, function(error, response, body) {
        	var registerAtrubinResponse = getContent("registerAtrubinResponse.json");
        	console.log(response.body);
            var user = response.body;
            
        	expect(response.statusCode).toEqual(200);
            expect(user.login).toEqual(registerAtrubinResponse.user.login);
            expect(user.email).toEqual(registerAtrubinResponse.user.email);
            done();
        });
    });
});

xdescribe('Registered user processing', function() {
    it('Will proceed with bad request code for registered user', function(done) {
    	request.get(registerUrl, {json:true, body: registerAtrubin}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(400);
    	expect(response.body).toEqual("User login " + registerAtrubin.user.login + " already registered");
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
