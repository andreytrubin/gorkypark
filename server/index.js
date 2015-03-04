// Include our custom module
var server = require("./server");
var router = require("./router");
var requestHanlders = require("./requestHandlers");

var handle = {};
handle["/register"] = requestHanlders.register;

// Start the server using exported function
server.start(router.route, handle);
