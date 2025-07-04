import jwt from "jsonwebtoken";
import { throwError } from "./response-utils.js";
export const verifyToken = (token) => {
	try {
		if (!token) {
			throwError(401, "Vui lòng đăng nhập để tiếp tục!");
		}
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			throwError(
				401,
				"Phiên đăng nhập đã hết thời gian, vui lòng đăng nhập lại !",
			);
		}
		if (error.name === "JsonWebTokenError") {
			throwError(401, "Token xác thực không hợp lệ, vui lòng đăng nhập lại!");
		}
		throwError(
			500,
			"Đã xảy ra lỗi khi xác thực phiên đăng nhập, vui lòng thử lại sau!",
		);
	}
};
