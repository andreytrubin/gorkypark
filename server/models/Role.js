module.exports = function(sequelize, DataTypes){
	return sequelize.define("role", {
		id: {
			type: DataTypes.INTEGER,
			field: "idRole",
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			field: "name"
		}
	}, {
		tableName: 'Role',
		updatedAt: false,
		createdAt: false
	});
};
