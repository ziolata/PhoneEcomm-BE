import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Order_item extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Order_item.belongsTo(models.Order, {
				foreignKey: "order_id",
			});
		}
	}
	Order_item.init(
		{
			order_id: DataTypes.INTEGER,
			product_variant_id: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			price: DataTypes.DECIMAL(10, 2),
		},
		{
			sequelize,
			modelName: "Order_item",
		},
	);
	return Order_item;
};
