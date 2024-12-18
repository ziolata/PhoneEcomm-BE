const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Discount_code extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Discount_code.init(
		{
			target_type: DataTypes.ENUM("all", "category", "product", "brand"),
			discount_type: DataTypes.ENUM(
				"percentage_Discount_code",
				"fixed_amount_Discount_code",
				"freeship",
			),
			code: DataTypes.STRING,
			value: DataTypes.DECIMAL(8, 2),
			target_id: DataTypes.INTEGER,
			expiry: DataTypes.DATEONLY,
		},
		{
			sequelize,
			modelName: "Discount_code",
		},
	);
	return Discount_code;
};
