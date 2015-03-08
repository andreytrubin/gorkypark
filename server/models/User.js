module.exports = function(sequelize, DataTypes){
	return sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			field: "idUser",
			primaryKey: true,
			autoIncrement: true
		},
		idRole: {
			type: DataTypes.INTEGER,
			field: "idRole",
			foreignKey: true,
			defaultValue: 4
		},
		login: {
			type: DataTypes.STRING,
			field: "login"
		},
		password: {
			type: DataTypes.STRING,
			field: "password"
		},
		firstName: {
			type: DataTypes.STRING,
			field: "first_name"
		},
		lastName: {
			type: DataTypes.STRING,
			field: "last_name"
		},
		email: {
			type: DataTypes.STRING,
			field: "email",
			unique: true
		},
		phone: {
			type: DataTypes.STRING,
			field: "phone"
		},
		regDate: {
			type: DataTypes.DATE,
			field: "reg_date",
		},
		statusBanned: {
			type: DataTypes.BOOLEAN,
			field: "status_banned"
		},
		birthDate: {
			type: DataTypes.DATE,
			field: "dob"
		},
	}, {
		tableName: 'user',
		updatedAt: false,
		createdAt: false
	});
};
