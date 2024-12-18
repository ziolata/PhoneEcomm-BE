import { Sequelize } from "sequelize";
import { data } from "../config/config.js";
// Option 1: Passing a connection URI

const { db_name, db_user, db_pass, db_host } = data;
const sequelize = new Sequelize(db_name, db_user, db_pass, {
	host: db_host,
	dialect: "mysql",
	logging: false,
});
// const connection = async () => {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// };
