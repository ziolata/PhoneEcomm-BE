const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role, {
				foreignKey: "role_id",
			});
		}
	}
	User.init(
		{
			fullname: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			avatar: DataTypes.STRING,
			sex: DataTypes.ENUM("male", "female"),
			phone: DataTypes.INTEGER,
			role_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
