const fs = require("fs");
const path = require("path");
const configPath = path.resolve(__dirname, "../config/config.js");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(configPath)[env];
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
fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && // Bỏ qua các tệp ẩn
			file !== basename && // Bỏ qua chính tệp index.js
			file.slice(-3) === ".js" && // Chỉ lấy các tệp JavaScript
			file.indexOf(".test.js") === -1 // Bỏ qua các tệp test
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes,
		);
		db[model.name] = model;
	});

// Gọi associate nếu model có định nghĩa quan hệ
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// Gắn Sequelize và instance vào đối tượng db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
