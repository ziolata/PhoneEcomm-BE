import "dotenv/config";

export const config = {
	port: process.env.PORT,
};

export const db = {
	db_host: process.env.DB_HOST,
	db_name: process.env.DB_NAME,
	db_user: process.env.DB_USER,
	db_pass: process.env.DB_PASS,
};
