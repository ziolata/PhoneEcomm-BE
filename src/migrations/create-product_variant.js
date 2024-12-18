/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Product_variants", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Products",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			sku: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
			},
			createdAt: {
				allowNull: false,
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Product_variants");
	},
};
