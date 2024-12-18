import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
export const register = async (email, password) => {
	try {
		const [user, created] = await db.User.findOrCreate({
			where: { email },
			defaults: {
				email,
				password: hashPassword(password),
			},
		});

		if (created) {
			return { message: "Register Successfully" }; // Tạo thành công
		}
		return { message: "Email is already registered" }; // Email đã tồn tại
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
export const login = async (email, password) => {
	try {
		const info = await db.User.findOne({
			where: { email },
			include: {
				model: db.Role,
				attributes: ["id", "name"],
			},
		});
		if (info && bcrypt.compareSync(password, info.password)) {
			const token = jwt.sign(
				{ id: info.id, email: info.email, role: info.Role.name },
				process.env.JWT_SECRET,
				{
					expiresIn: "3d",
				},
			);
			const bearerToken = `Bearer ${token}`;
			return {
				data: { message: "Login successfully", access_token: bearerToken },
			};
		}
		return { message: "Incorrect email or password" };
	} catch (error) {
		console.error(error);
		throw new Error("Database Error");
	}
};
