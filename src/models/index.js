const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
// Kiểm tra nếu có sử dụng biến môi trường cho connection string
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	// Khởi tạo Sequelize với các giá trị từ config.js
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config,
	);
}

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
