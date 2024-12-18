const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Option_value extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Option_value.belongsTo(models.Option, {
				foreignKey: "option_id",
			});
			Option_value.hasMany(models.Variant_option_value, {
				foreignKey: "Option_value_id",
			});
		}
	}
	Option_value.init(
		{
			option_id: DataTypes.INTEGER,
			value: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Option_value",
		},
	);
	return Option_value;
};
