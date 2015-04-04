// Include our custom module
var server = require("./server");
var router = require("./router");
var registerUserHandler = require("./registerUserHandler");
var listAttractionsHandler = require("./listAttractionsHandler");
var attractionDetailHandler = require("./attractionDetailHandler");
var authenticateHandler = require("./authenticateHandler");
var tokenValidator = require("./tokenValidator");
var cartHandler = require("./cartHandler");

var handle = {};
handle["/register"] = registerUserHandler.register;
handle["/attractions"] = listAttractionsHandler.getAttractions;
handle["/attractiondetails"] = attractionDetailHandler.getAttractionDetails;
handle["/authenticate"] = authenticateHandler.authenticate;
handle["/validateToken"] = tokenValidator.validateToken;
handle["/addtocart"] = cartHandler.addToCart;

// Start the server using exported function
server.start(router.route, handle);
