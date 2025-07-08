import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Address_cache extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here nếu sau này cần
		}
	}

	Address_cache.init(
		{
			address: DataTypes.STRING,
			latitude: DataTypes.DOUBLE,
			longitude: DataTypes.DOUBLE,
		},
		{
			sequelize,
			modelName: "Address_cache",
		},
	);

	return Address_cache;
};
