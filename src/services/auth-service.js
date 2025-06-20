import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/auth-validation.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { hashPassword } from "../utils/hash-utils.js";

export const register = async (data) => {
	try {
		handleValidate(registerSchema, data);
		const [user, created] = await db.User.findOrCreate({
			where: { email: data.email },
			defaults: {
				email: data.email,
				fullname: data.fullname,
				password: hashPassword(data.password),
			},
		});
		if (created) {
			return { message: "Đăng ký thành công!" }; // Tạo thành công
		}
		return { message: "Email đăng ký đã tồn tại!" }; // Email đã tồn tại
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const login = async (email, password) => {
	try {
		handleValidate(loginSchema, { email, password });
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
				data: { message: "Đăng nhập thành công", access_token: bearerToken },
			};
		}

		return { message: "Sai email hoặc mật khẩu" };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
