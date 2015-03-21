var models = require("./models");
var commons = require("./commons");
var url = require("url");

function getAttractionDetails(response, request) {
	if (request == null || request == undefined) {
		commons.badRequest("Bad Request method", response);
		return;
	}
	
	var query = url.parse(request.url, true).query;
	
	if (query.id != null || query.id != undefined) {
		models.Attraction.find({where: {id: query.id}},{attributes: ["title", "description", "prodCountry",
		      "places", "attPicture", "priceAdult", "priceChild"]}).then(function(attraction){
		    	  if (attraction != null) {
		    		  console.log(attraction.dataValues);
		    		  commons.success(response, attraction.dataValues);	
				} else {
					commons.notFound("Attraction not found", response);
				}
		      });
	} else{
		commons.badRequest("ID cannot be null", response);
	}
}

exports.getAttractionDetails = getAttractionDetails;