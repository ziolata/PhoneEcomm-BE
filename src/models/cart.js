import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Cart.hasMany(models.Cart_item, {
				foreignKey: "Cart_id",
			});
			Cart.belongsTo(models.User, {
				foreignKey: "user_id",
			});
		}
	}
	Cart.init(
		{
			user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Cart",
		},
	);
	return Cart;
};
