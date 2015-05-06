module.exports = function(sequelize, DataTypes){
	return sequelize.define("cart_item", {
		id: {
			type: DataTypes.INTEGER,
			field: "idCart_Item",
			primaryKey: true,
			autoIncrement: true
		},
		idCart: {
			type: DataTypes.INTEGER,
			field: "idCart",
			foreignKey: true,
		},
		idAttraction: {
			type: DataTypes.INTEGER,
			field: "idAttraction",
			foreignKey: true,
		},
		adultQuant: {
			type: DataTypes.INTEGER,
			field: "adult_quant"
		},
		childQuant: {
			type: DataTypes.INTEGER,
			field: "child_quant"
		}
	}, {
		tableName: 'Cart_Item',
		updatedAt: false,
		createdAt: false
	});
};
	