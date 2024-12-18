/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Inventories", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			name: {
				type: Sequelize.STRING,
			},
			quantity: {
				type: Sequelize.INTEGER,
			},
			location: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("Inventories");
	},
};
