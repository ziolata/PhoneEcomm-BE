import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/auth-validation.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { hashPassword } from "../utils/hash-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const register = async (data) => {
	handleValidate(registerSchema, data);
	const [user, created] = await db.User.findOrCreate({
		where: { email: data.email },
		defaults: {
			email: data.email,
			fullname: data.fullname,
			password: hashPassword(data.password),
		},
	});
	// Nếu email tồn tại
	if (user) {
		throwError(400, "Email đăng ký đã tồn tại!");
	}
	return successResponse("Đăng ký thành công!");
};

export const login = async (email, password) => {
	// Kiểm tra đầu vào bằng thư viện Joi
	handleValidate(loginSchema, { email, password });
	const foundUser = await db.User.findOne({
		where: { email },
		include: {
			model: db.Role,
			attributes: ["id", "name"],
		},
	});
	// Email tồn tại và kiểm tra mã khẩu được mã hóa và mật khẩu truyền vào bằng thư viên bcrypt
	if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
		const token = jwt.sign(
			{ id: foundUser.id, email: foundUser.email, role: foundUser.Role.name },
			process.env.JWT_SECRET,
			{
				expiresIn: "3d",
			},
		);
		const bearerToken = `Bearer ${token}`;
		return successResponse("Đăng nhập thành công!", bearerToken);
	}
	throwError(400, "Sai tài khoản hoặc mật khẩu!");
};
