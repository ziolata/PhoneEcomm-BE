/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Cart_items", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cart_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Carts",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			product_variant_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Product_variants",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			quantity: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Cart_item");
	},
};
