import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Variant_option_value extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Variant_option_value.belongsTo(models.Product_variant, {
				foreignKey: "product_variant_id",
			});
			Variant_option_value.belongsTo(models.Option_value, {
				foreignKey: "option_value_id",
			});
		}
	}
	Variant_option_value.init(
		{
			product_variant_id: DataTypes.INTEGER,
			option_value_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Variant_option_value",
		},
	);
	return Variant_option_value;
};
