import { Model } from "sequelize";
import sequelizePaginate from "sequelize-paginate";
export default (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.Category, {
				foreignKey: "category_id",
			});

			Product.belongsTo(models.Brand, {
				foreignKey: "brand_id",
			});
			Product.hasMany(models.Product_variant, {
				foreignKey: "product_id",
			});
		}
	}
	Product.init(
		{
			name: DataTypes.STRING,
			img: DataTypes.STRING,
			description: DataTypes.STRING,
			features: DataTypes.ENUM("hot", "discount", "over"),
			category_id: DataTypes.INTEGER,
			brand_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Product",
		},
	);
	sequelizePaginate.paginate(Product);

	return Product;
};
