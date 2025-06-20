import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
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
