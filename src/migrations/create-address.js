/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Addresses", {
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
			shipping_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Shippings", // Tên bảng mục tiêu
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			name: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.INTEGER,
			},
			address_line_1: {
				type: Sequelize.STRING,
			},
			address_line_2: {
				type: Sequelize.STRING,
			},
			address_type: {
				type: Sequelize.ENUM("Home", "Office"),
			},
			address_default: {
				type: Sequelize.ENUM("Yes", "No"),
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
		await queryInterface.dropTable("Addresses");
	},
};
