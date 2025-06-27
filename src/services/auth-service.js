import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/auth-validation.js";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { hashPassword } from "../utils/hash-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";
import { sendResetEmail } from "../utils/email-utils.js";
import { verifyToken } from "../utils/auth-utils.js";
import { changePasswordValidate } from "../validations/user-validation.js";

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

export const changePassword = async (data, user_id) => {
	const emailExist = await db.User.findOne({
		where: {
			id: user_id,
		},
	});
	if (!emailExist) {
		throwError(404, "Email không tồn tại!");
	}
	const validData = handleValidate(changePasswordValidate, data);
	if (
		emailExist &&
		bcrypt.compareSync(validData.password, emailExist.password)
	) {
		await db.User.update(
			{ password: hashPassword(validData.newpassword) },
			{
				where: {
					email: emailExist.email,
				},
			},
		);
		return successResponse("Đổi mật khẩu thành công!");
	}
};

export const forgotPassword = async (email) => {
	const emailExist = await db.User.findOne({
		where: {
			email: email,
		},
	});
	if (!emailExist) {
		throw { status: 400, message: "Email không tồn tại" };
	}
	const token = jwt.sign(
		{ id: emailExist.id, email: emailExist.email },
		process.env.JWT_SECRET,
		{
			expiresIn: "15m",
		},
	);
	await db.User.update(
		{ password_reset_token: token },
		{ where: { id: emailExist.id } },
	);
	const link = `${process.env.LINK_EMAIL}/${token}`;
	await sendResetEmail(email, link);
	return successResponse("Yêu cầu đã được gửi vào email!");
};

export const resetPassword = async (data) => {
	const user = await db.User.findOne({
		where: {
			password_reset_token: data.token,
		},
	});
	if (!user) {
		throwError(404, "Yêu cầu đổi mật khẩu không hợp lệ!");
	}
	const decode = verifyToken(data.token);

	await db.User.update(
		{
			password: hashPassword(data.password),
			password_reset_token: null,
		},
		{
			where: {
				email: decode.email,
			},
		},
	);

	return successResponse("Đặt lại mật khẩu thành công!");
};
