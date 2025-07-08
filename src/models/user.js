import { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";

export default (sequelize, DataTypes) => {
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
			password_reset_token: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		},
	);
	sequelizePaginate.paginate(User);

	return User;
};
