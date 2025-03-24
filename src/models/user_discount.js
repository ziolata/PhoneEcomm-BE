const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User_Discount extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User_Discount.belongsTo(models.Discount_code, {
				foreignKey: "discount_code_id",
			});
			User_Discount.belongsTo(models.User, {
				foreignKey: "user_id",
			});
		}
	}
	User_Discount.init(
		{
			user_id: DataTypes.INTEGER,
			discount_code_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User_Discount",
		},
	);
	return User_Discount;
};
