module.exports = function(sequelize, DataTypes){
	return sequelize.define("attraction", {
		id: {
			type: DataTypes.INTEGER,
			field: "idAttraction",
			primaryKey: true,
			autoIncremet: true
		},
		title: {
			type: DataTypes.STRING,
			field: "title"
		},
		description: {
			type: DataTypes.TEXT,
			field: "description"
		},
		prodCountry: {
			type: DataTypes.STRING,
			field: "prod_country"
		},
		places: {
			type: DataTypes.INTEGER,
			field: "places"
		},
		attPicture: {
			type: DataTypes.STRING,
			field: "att_picture"
		},
		priceAdult: {
			type: DataTypes.INTEGER,
			field: "price_adult"
		},
		priceChild: {
			type: DataTypes.INTEGER,
			field: "price_child"
		}
	}, {
		tableName: 'attraction',
		updatedAt: false,
		createdAt: false
	});
};
	