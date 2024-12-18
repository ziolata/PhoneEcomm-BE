/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullname: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.INTEGER,
			},
			avatar: {
				type: Sequelize.STRING,
			},
			sex: {
				type: Sequelize.ENUM("male", "female"),
			},
			role_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Roles", // Tên bảng mục tiêu
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
		await queryInterface.dropTable("Users");
	},
};
