import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { transporter } from "../config/nodemailer";
export const verifyToken = (token) => {
	try {
		if (!token) {
			return createHttpError.Unauthorized();
		}
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			throw { status: 400, message: "Yêu cầu đã hết thời gian!" };
		}
		if (error.name === "JsonWebTokenError") {
			throw {
				status: 400,
				message: "Token không hợp lệ.",
			};
		}
		throw { status: 500, message: "Lỗi xác thực token" };
	}
};
export const sendResetEmail = async (to, link) => {
	const mailOptions = {
		from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Đặt lại mật khẩu",
		html: `<p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
			<p>Nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>
			<a href="${link}">Click vào đây để đặt lại mật khẩu</a>
			<p>Liên kết này sẽ hết hạn sau 15 phút.</p>`,
	};

	await transporter.sendMail(mailOptions);
};
