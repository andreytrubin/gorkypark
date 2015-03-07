module.exports = function(sequelize, DataTypes){
	return sequelize.define("transaction", {
			id: {
				type: DataTypes.INTEGER,
				field: "idTransaction",
				primaryKey: true,
				autoIncremet: true
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
		}, {
			tableName: 'transaction'
		});
};
