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
     "Role",
     "Cart",
     "CartItem"
];

// Models registration
models.forEach(function(model) {
	  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// Model relatipships registration
(function(m) {
	  m.User.hasMany(m.Transaction, {foreignKey: "idUser", constraints: false});
	  m.User.hasMany(m.Cart, {foreignKey: "idUser", constraints: true});
	  m.Transaction.hasMany(m.Ticket, {foreignKey: "idTransaction", constraints: false});
	  m.Attraction.hasMany(m.Ticket, {foreignKey: "idAttraction", constraints: false});
	  m.Attraction.hasOne(m.CartItem, {foreignKey: "idAttraction", constraints: false});
	  m.Role.hasMany(m.User, {foreignKey:"idRole", constraints: false });
	  m.Cart.hasMany(m.CartItem, {foreignKey:"idCart", constraints: false });
}) (module.exports);

// export connection
module.exports.sequelize = sequelize;
