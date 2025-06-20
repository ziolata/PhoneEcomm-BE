import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Option extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Option.hasMany(models.Option_value, {
				foreignKey: "option_id",
			});
		}
	}
	Option.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Option",
		},
	);
	return Option;
};
