var Sequelize = require("sequelize");

// Sequelize connection parameters
var sequelize = new Sequelize("park", "park", "park", {
	host: "localhost",
	port: "3306",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 1,
		idle: 10000
	}
});

// Model names
var models = [
     "User",
     "Attraction",
     "Ticket",
     "Transaction"
];

// Models registration
models.forEach(function(model) {
	  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// Model relatipships registration
(function(m) {
	  m.Transaction.belongsTo(m.User);
	  m.Attraction.belongsTo(m.Ticket);
	  m.Ticket.belongsTo(m.Transaction);
	  m.User.hasMany(m.Transaction);
	  m.Transaction.hasMany(m.Ticket);
	  m.Attraction.hasMany(m.Ticket);
}) (module.exports);

// export connection
module.exports.sequelize = sequelize;
