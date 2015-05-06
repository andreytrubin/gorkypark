module.exports = function(sequelize, DataTypes){
	return sequelize.define("cart", {
		id: {
			type: DataTypes.INTEGER,
			field: "idCart",
			primaryKey: true,
			autoIncrement: true
		},
		idUser: {
			type: DataTypes.INTEGER,
			field: "idUser",
			foreignKey: true
		},
		calculateAmount: function(userLogin){
			sequelize.query("SELECT   Cart.idUser," + 
					"Cart.idCart, " + 
					"sum(Attraction.price_adult*Cart_Item.adult_quant) + sum(Attraction.price_child*Cart_Item.child_quant)" + 
					"FROM     User " + 
					"JOIN Cart ON User.idUser = Cart.idUser" + 
					"JOIN Cart_Item ON Cart.idCart = Cart_Item.idCart " + 
					"JOIN Attraction ON Cart_Item.idAttraction = Attraction.idAttraction" + 
					"WHERE    User.login = :login" + 
					"GROUP BY Cart.idUser;", {replacements: {login: userLogin}, type: sequelize.QueryTypes.SELECT})
					.then(function(cart) {
						console.log(cart);
					});
		}
	}, {
		tableName: 'Cart',
		updatedAt: false,
		createdAt: false
	});
};
	