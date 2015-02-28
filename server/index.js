// Include our custom module
var server = require("./server");
var router = require("./router");
var requestHanlders = require("./requestHandlers");

var handle = {};
handle["/"] = requestHanlders.start;
handle["/start"] = requestHanlders.start;
handle["/upload"] = requestHanlders.upload;
handle["/show"] = requestHanlders.show;
handle["/register"] = requestHanlders.register;

// Start the server using exported function
server.start(router.route, handle);
