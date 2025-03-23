const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product_variant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product_variant.belongsTo(models.Product, {
				foreignKey: "product_id",
			});
			// Product_variant.hasMany(models.Cart_item, {
			// 	foreignKey: "product_variant_id",
			// });
			Product_variant.hasMany(models.Inventory, {
				foreignKey: "product_variant_id",
			});
			Product_variant.hasMany(models.Variant_option_value, {
				foreignKey: "product_variant_id",
			});
		}
	}
	Product_variant.init(
		{
			product_id: DataTypes.INTEGER,
			img: DataTypes.STRING,
			sku: DataTypes.STRING,
			price: DataTypes.DECIMAL(10, 2),
		},
		{
			sequelize,
			modelName: "Product_variant",
		},
	);
	return Product_variant;
};
