import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Cart_item extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Cart_item.belongsTo(models.Cart, {
				foreignKey: "cart_id",
			});
			Cart_item.belongsTo(models.Product_variant, {
				foreignKey: "product_variant_id",
			});
		}
	}
	Cart_item.init(
		{
			cart_id: DataTypes.INTEGER,
			product_variant_id: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			price: DataTypes.DECIMAL(10, 2),
		},
		{
			sequelize,
			modelName: "Cart_item",
		},
	);
	return Cart_item;
};
