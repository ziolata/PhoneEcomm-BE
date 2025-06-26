import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Review.belongsTo(models.User, {
				foreignKey: "user_id",
			});
			Review.belongsTo(models.Product_variant, {
				foreignKey: "product_variant_id",
			});
		}
	}
	Review.init(
		{
			user_id: DataTypes.INTEGER,
			product_variant_id: DataTypes.INTEGER,
			img: DataTypes.STRING,
			rating: DataTypes.DECIMAL(3, 2),
			review: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Review",
		},
	);
	return Review;
};
