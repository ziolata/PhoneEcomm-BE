/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Reviews", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users", // Tên bảng mục tiêu
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
			rating: {
				type: Sequelize.DECIMAL(1, 1),
			},
			review: {
				type: Sequelize.STRING,
			},
			img: {
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
		await queryInterface.dropTable("Reviews");
	},
};
