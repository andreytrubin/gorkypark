var request = require("request");
var fs = require("fs");

var attractionUrl = "https://localhost:8888/attractions";


xdescribe('Getting list attractions', function() {
    it('Will return existing list attractions', function(done) {
    	
    	var result = [ { title: 'Колесо обозрения',
    	    description: 'Колесо обозрения поможет вам обозреть город',
    	    prodCountry: 'Украина',
    	    places: 100,
    	    attPicture: 'здесь должна быть картинка',
    	    priceAdult: 25,
    	    priceChild: 15 },
    	  { title: 'Катапульта',
    	    description: 'катапульта катапультирует вверх',
    	    prodCountry: 'Украина',
    	    places: 2,
    	    attPicture: 'здесь должна быть картинка',
    	    priceAdult: 80,
    	    priceChild: 80 } ];


    	request.get(registerUrl, {json:true}, function(error, response, body) {
    	console.log(response.body);
    	expect(response.statusCode).toEqual(200);
    	expect(response.body).toEqual(result);
        done();
        
    });
});
});