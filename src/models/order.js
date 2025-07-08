import { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";

export default (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Order.belongsTo(models.User, {
				foreignKey: "user_id",
			});
			Order.hasOne(models.Shipping, {
				foreignKey: "order_id",
			});
			Order.hasMany(models.Order_item, {
				foreignKey: "order_id",
			});
			Order.belongsTo(models.Discount_code, {
				foreignKey: "discount_code_id",
			});
		}
	}
	Order.init(
		{
			user_id: DataTypes.INTEGER,
			total_amount: DataTypes.DECIMAL(10, 2),
			status: DataTypes.ENUM(
				"pending",
				"paid",
				"shipping",
				"canceled",
				"completed",
			),
			discount_code_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Order",
		},
	);
	sequelizePaginate.paginate(Order);

	return Order;
};
