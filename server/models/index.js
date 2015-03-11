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
     "Transaction",
     "Role"
];

// Models registration
models.forEach(function(model) {
	  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// Model relatipships registration
(function(m) {
	  m.User.hasMany(m.Transaction, {foreignKey: "idTransaction", constraints: false});
	  m.Transaction.hasMany(m.Ticket, {foreignKey: "idTicket", constraints: false});
	  m.Attraction.hasMany(m.Ticket, {foreignKey: "idTicket", constraints: false});
	  m.Role.hasMany(m.User, {foreignKey:"idRole", constraints: false });
}) (module.exports);

// export connection
module.exports.sequelize = sequelize;
