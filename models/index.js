var Sequelize = require("sequelize");

var sequelize = new Sequelize("park", "park", "park", {
	host: "localhost",
	port: "3306",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 1,
		idle: 10000
	}
}
);

var models = [
             "User",
             "Attraction",
             "Ticket",
             "Transatcion"
];
models.forEach(function(model) {
	  module.exports[model] = sequelize.import("d/work/gorkypark/models" + '/' + model);
	});

(function(m) {
	  m.Transatcion.belongsTo(m.User);
	  m.Attraction.belongsTo(m.Ticket);
	  m.Ticket.belongsTo(m.Transaction);
	  m.User.hasMany(m.Transaction);
	  m.Transaction.hasMany(m.Ticket);
	  m.Attraction.hasMany(m.Ticket);
	})(module.exports);

	// export connection
	module.exports.sequelize = sequelize;