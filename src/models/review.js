const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
				foreignKey: "Product_variant_id",
			});
		}
	}
	Review.init(
		{
			user_id: DataTypes.INTEGER,
			Product_variant_id: DataTypes.INTEGER,
			img: DataTypes.STRING,
			rating: DataTypes.DECIMAL(1, 1),
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Review",
		},
	);
	return Review;
};
