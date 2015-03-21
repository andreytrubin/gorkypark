var models = require("./models");
var commons = require("./commons");


function getAttractions(response, postData) {
	models.Attraction.findAll({attributes: ["title", "description", "prodCountry",
	       "places", "attPicture", "priceAdult", "priceChild"]}).then(function(attractions) {
	    	   console.log(transformAttractions(attractions));
	    	   commons.success(response, transformAttractions(attractions));
	});
}

function transformAttractions(attractions) {
	var result = [];
	for ( var i = 0; i < attractions.length; i++) {
		result[i] = attractions[i].dataValues;
	}
	return result;
}


exports.getAttractions = getAttractions;
