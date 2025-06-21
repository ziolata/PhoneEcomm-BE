import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { changePasswordValidate } from "../validations/user-validation.js";
import { hashPassword } from "../utils/hash-utils.js";
import { verifyToken } from "../utils/auth-utils.js";
import { sendResetEmail } from "../utils/email-utils.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const getProfileUser = async (user_id) => {
	const response = await db.User.findOne({
		where: {
			id: user_id,
		},
	});
	return successResponse("Lấy thông tin thành công!", response);
};

export const updateProfile = async (data, id) => {
	handleValidate(userSchema, data);
	await db.User.update(
		{
			fullname: data.fullname,
			avatar: data.avatar,
			phone: data.phone,
		},
		{
			where: { id },
		},
	);
	return successResponse("Cập nhật thành công!");
};

export const changePassword = async (data) => {
	const emailExist = await db.User.findOne({
		where: {
			email: data.email,
		},
	});
	if (emailExist && bcrypt.compareSync(data.password, emailExist.password)) {
		handleValidate(changePasswordValidate);
		await db.User.update(
			{ password: hashPassword(data.newpassword) },
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
