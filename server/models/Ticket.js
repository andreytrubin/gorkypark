module.exports = function(sequelize, DataTypes){
	return sequelize.define("ticket", {
		id: {
			type: DataTypes.INTEGER,
			field: "idTicket",
			primaryKey: true,
			autoIncremet: true
		},
		price: {
			type: DataTypes.INTEGER,
			field: "price"
		},
		buyDate: {
			type: DataTypes.DATE,
			field: "buy_date"
		},
		validDate: {
			type: DataTypes.DATE,
			field: "valid_date"
		}
	}, {
		tableName: 'Ticket',
		updatedAt: false,
		createdAt: false
	});
};
