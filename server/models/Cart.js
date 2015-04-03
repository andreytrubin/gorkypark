module.exports = function(sequelize, DataTypes){
	return sequelize.define("cart", {
		id: {
			type: DataTypes.INTEGER,
			field: "idCart",
			primaryKey: true,
			autoIncremet: true
		},
		idUser: {
			type: DataTypes.INTEGER,
			field: "idUser",
			foreignKey: true
		}
	}, {
		tableName: 'Cart',
		updatedAt: false,
		createdAt: false
	});
};
	