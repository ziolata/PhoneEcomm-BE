import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleValidate } from "../utils/handle-validation-utils.js";
import { changePasswordValidate } from "../validations/user-validation.js";
import { hashPassword } from "../utils/hash-utils.js";
import { verifyToken } from "../utils/auth-utils.js";
import { sendResetEmail } from "../utils/email-utils.js";

export const getProfile = async () => {
	try {
		const response = await db.User.findAll({
			where: {
				id: user_id,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateProfile = async (data, param) => {
	try {
		handleValidate(userSchema, data);
		const response = await db.User.update(
			{
				fullname: data.fullname,
				avatar: data.avatar,
				phone: data.phone,
			},
			{
				where: {
					id: param,
				},
			},
		);
		if (response) {
			return { message: "Cập nhật thành công" };
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const changePassword = async (data) => {
	try {
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
			return { message: "Đổi mật khẩu thành công!" };
		}
	} catch (error) {
		console.log(error);
	}
};
export const forgotPassword = async (email) => {
	try {
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
		const link = `http://127.0.0.1:5000/api/v1/user/reset_password/${token}`;
		await sendResetEmail(email, link);
		return { message: "Yêu cầu đã được gửi vào email!" };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const resetPassword = async (data) => {
	try {
		const user = await db.User.findOne({
			where: {
				password_reset_token: data.token,
			},
		});
		if (!user) {
			throw { status: 404, message: "Yêu cầu đổi mật khẩu không hợp lệ!" };
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

		return { message: "Đặt lại mật khẩu thành công!" };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
