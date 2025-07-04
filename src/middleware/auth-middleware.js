import { userSchema } from "../validations/user-validation.js";
import createHttpError from "http-errors";
import { verifyToken } from "../utils/auth-utils.js";
import { throwError } from "../utils/response-utils.js";
export const validateAuth = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		const errMessage = createHttpError.BadRequest(error.details[0].message);
		return res.status(400).json(errMessage);
	}
	next();
};

export const isAuthenticated = (req, res, next) => {
	try {
		const headers = req.headers.authorization;
		const token = headers?.split(" ")[1];
		const user = verifyToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
export const isAdmin = (req, res, next) => {
	try {
		const headers = req.headers.authorization;
		const token = headers?.split(" ")[1];
		const user = verifyToken(token);
		req.user = user;
		if (req.user.role === "USER") {
			throwError(403, "Bạn không đủ quyền truy cập!");
		}
		next();
	} catch (error) {
		next(error);
	}
};
