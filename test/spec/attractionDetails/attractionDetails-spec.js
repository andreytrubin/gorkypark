var request = require("request");
var fs = require("fs");

var urlForExisting = "http://localhost:8888/attractiondetails?id=1";
var urlForUnExisting = "http://localhost:8888/attractiondetails?id=8";
var urlWithoutID = "http://localhost:8888/attractiondetails";

xdescribe('Existing attraction processing', function() {
    it('Will return existing attraction', function(done) {
    	
    	var result = {id: 1,
    			  title: 'Колесо обозрения',
    			  description: 'Колесо обозрения поможет вам обозреть город',
    			  prodCountry: 'Украина',
    			  places: 100,
    			  attPicture: 'здесь должна быть картинка',
    			  priceAdult: 25,
    			  priceChild: 15 };

    	request.get(urlForExisting, {json:true}, function(error, response, body) {
    		console.log("REPSONSE BODY");
    	console.log(response.body);
    	expect(response.statusCode).toEqual(200);
    	expect(response.body).toEqual(result);
        done();
        
    });
});
});

xdescribe('Unexisting attraction processing', function() {
    it('Will return 404 Error', function(done) {
    	
    	request.get(urlForUnExisting, {json:true}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(404);
    	expect(response.body).toEqual("Attraction not found");
        done();
        
    });
});
});

xdescribe('Missing ID processing', function() {
    it('Will return 400 Bad Request', function(done) {
    	
    	request.get(urlWithoutID, {json:true}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(400);
    	expect(response.body).toEqual("ID cannot be null");
        done();
        
    });
});
});