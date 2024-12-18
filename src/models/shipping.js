const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Shipping extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Shipping.belongsTo(models.Order, {
				foreignKey: "order_id",
			});
			Shipping.hasOne(models.Address, {
				foreignKey: "shipping_id",
			});
		}
	}
	Shipping.init(
		{
			order_id: DataTypes.INTEGER,
			type: DataTypes.ENUM("Post office", "Express delivery"),
			status: DataTypes.ENUM("pending", "shipped", "completed"),
			Shipfee: DataTypes.DECIMAL(10, 2),
		},
		{
			sequelize,
			modelName: "Shipping",
		},
	);
	return Shipping;
};
