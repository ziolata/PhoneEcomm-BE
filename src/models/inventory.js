const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Inventory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Inventory.belongsTo(models.Product_variant, {
				foreignKey: "product_variant_id",
			});
		}
	}
	Inventory.init(
		{
			name: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
			location: DataTypes.STRING,
			product_variant_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Inventory",
		},
	);
	return Inventory;
};
