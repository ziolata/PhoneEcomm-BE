export const development = {
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	logging: false,
	timezone: "+07:00",
};

export const production = {
	username: process.env.PROD_DB_USER,
	password: process.env.PROD_DB_PASS,
	database: process.env.PROD_DB_NAME,
	host: process.env.PROD_DB_HOST,
	dialect: process.env.PROD_DB_DIALECT,
	logging: false,
	timezone: "+00:00",
};
