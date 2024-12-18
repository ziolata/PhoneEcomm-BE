/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Discount_codes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			target_type: {
				type: Sequelize.ENUM("all", "category", "product", "brand"),
			},
			discount_type: {
				type: Sequelize.ENUM(
					"percentage_discount",
					"fixed_amount_discount",
					"freeship",
				),
			},
			code: {
				type: Sequelize.STRING,
			},
			value: {
				type: Sequelize.DECIMAL(8, 2),
			},
			target_id: {
				type: Sequelize.INTEGER,
			},
			expiry: {
				type: Sequelize.DATEONLY,
				allowNull: false,
				validate: {
					isDate: true,
				},
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
		await queryInterface.dropTable("Discount_codes");
	},
};
