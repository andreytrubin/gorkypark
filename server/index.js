// Include our custom module
var server = require("./server");
var router = require("./router");
var registerUserHandler = require("./registerUserHandler");
var listAttractionsHandler = require("./listAttractionsHandler");
var attractionDetailHandler = require("./attractionDetailHandler");
var authenticateHandler = require("./authenticateHandler");
//var registerPurchasesHandler = require("registerPurchasesHandler");

var handle = {};
handle["/register"] = registerUserHandler.register;
handle["/attractions"] = listAttractionsHandler.getAttractions;
handle["/attractiondetails"] = attractionDetailHandler.getAttractionDetails;
handle["/authenticate"] = authenticateHandler.authenticate;
//handle["/validateToken"] = registerPurchasesHandler.validateToken;


// Start the server using exported function
server.start(router.route, handle);
