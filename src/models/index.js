import fs from "fs";
import path from "path";
import configPath from "../config/mysql.js";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configPath[env];

const db = {};

// Khởi tạo Sequelize với các giá trị từ config.js
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		dialect: config.dialect,
		logging: false,
	},
);

// Đọc tất cả các model trong thư mục và khởi tạo
const files = fs.readdirSync(__dirname);

for (const file of files) {
	if (
		file.indexOf(".") !== 0 &&
		file !== basename &&
		file.slice(-3) === ".js" &&
		file.indexOf(".test.js") === -1
	) {
		const { default: modelDefiner } = await import(`./${file}`);
		const model = modelDefiner(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	}
}

// Gọi associate nếu có
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
// Gắn Sequelize và instance vào đối tượng db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db;
