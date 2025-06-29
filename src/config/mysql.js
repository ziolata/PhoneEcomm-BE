import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT || "mysql",
		logging: false,
		timezone: "+07:00",
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT || "mysql",
		logging: false,
		timezone: "+07:00",
	},
};
