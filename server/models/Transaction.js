module.exports = function(sequelize, DataTypes){
	return sequelize.define("transaction", {
			id: {
				type: DataTypes.INTEGER,
				field: "idTransaction",
				primaryKey: true,
				autoIncremet: true
			},
			idUser: {
				type: DataTypes.INTEGER,
				field: "idRole",
				foreignKey: true,
			},
			transactionDate: {
				type: DataTypes.DATE,
				field: "transaction_date"
			},
			amount: {
				type: DataTypes.INTEGER,
				field: "amount"
			},
			transactionStatus: {
				type: DataTypes.STRING,
				field: "transatcion_status"
			},
			ticketCount: {
				type: DataTypes.INTEGER,
				field: "ticket_count"
			}
		}, {
			tableName: 'Transaction',
			updatedAt: false,
			createdAt: false
		});
};
