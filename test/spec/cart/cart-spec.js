var request = require("request");
var fs = require("fs");
var SPEC_FILES = "spec/cart/";
var cartUrl = "https://localhost:8888/addtocart";

function getContent(path) {
	var result = JSON.parse(fs.readFileSync(SPEC_FILES + path, "utf8"));
	return result;
}

function readHeader(path){
	var header = fs.readFileSync(SPEC_FILES + path, "utf-8");
	return header;
}

var addItem = getContent("add.json");
var updateItem = getContent("update.json");

describe('Adding items to CartItem table', function() {
    it('Will return 200', function(done) {
    	var headers = {};
    	headers.Authorization = readHeader("token.json");
    	console.log(headers);
    	request.post(cartUrl, {headers: headers, json:true, body: addItem}, function(error, response, body) {

    	expect(response.statusCode).toEqual(200);
        done();
    });
});
});
