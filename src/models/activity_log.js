import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Activity_log extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	Activity_log.init(
		{
			user_id: DataTypes.INTEGER,
			role: DataTypes.STRING,
			action: DataTypes.STRING,
			target: DataTypes.STRING,
			target_id: DataTypes.INTEGER,
			description: DataTypes.STRING,
			ip_address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Activity_log",
		},
	);

	return Activity_log;
};
