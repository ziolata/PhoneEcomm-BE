/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Payments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			order_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Orders", // Tên bảng mục tiêu
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			amount: {
				type: Sequelize.DECIMAL(10, 2),
			},
			status: {
				type: Sequelize.ENUM("Successfully", "Failled"),
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
		await queryInterface.dropTable("Payments");
	},
};
