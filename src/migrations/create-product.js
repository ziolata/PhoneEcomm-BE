/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			img: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			features: {
				type: Sequelize.ENUM("hot", "discount", "over"),
			},
			category_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Categories", // Tên bảng mục tiêu (case-sensitive)
					key: "id", // Cột liên kết trong bảng mục tiêu
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL", // Khi xóa Category, đặt giá trị `null` trong Product
			},
			brand_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Brands", // Tên bảng mục tiêu
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
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
		await queryInterface.dropTable("Products");
	},
};
