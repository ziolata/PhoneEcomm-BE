import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Payment.belongsTo(models.Order, {
				foreignKey: "order_id",
			});
		}
	}
	Payment.init(
		{
			order_id: DataTypes.INTEGER,
			amount: DataTypes.INTEGER,
			status: DataTypes.ENUM("Successfully", "Failled"),
		},
		{
			sequelize,
			modelName: "Payment",
		},
	);
	return Payment;
};
