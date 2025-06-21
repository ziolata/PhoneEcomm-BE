import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Address extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Address.belongsTo(models.User, {
				foreignKey: "user_id",
			});
			Address.belongsTo(models.Shipping, {
				foreignKey: "shipping_id",
			});
		}
	}
	Address.init(
		{
			user_id: DataTypes.INTEGER,
			shipping_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			phone: DataTypes.INTEGER,
			address_line_1: DataTypes.INTEGER,
			address_line_2: DataTypes.INTEGER,
			address_type: DataTypes.ENUM("Home", "Office"),
			address_default: DataTypes.ENUM("Yes", "No"),
		},
		{
			sequelize,
			modelName: "Address",
		},
	);
	return Address;
};
