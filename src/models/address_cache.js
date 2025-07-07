import { DataTypes } from "sequelize";

export default (sequelize) => {
	const Address_cache = sequelize.define(
		"Address_cache",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			address: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			latitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			tableName: "address_cache",
			timestamps: false, // hoặc true nếu muốn có createdAt, updatedAt tự động
		},
	);

	return Address_cache;
};
