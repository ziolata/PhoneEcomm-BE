import { userSchema } from "../validations/authValidation";
import createHttpError from "http-errors";
import { verifyToken } from "../helper/auth";
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
	} catch (error) {}
};
export const isAdmin = (req, res, next) => {
	try {
		const headers = req.headers.authorization;
		const token = headers?.split(" ")[1];
		const user = verifyToken(token);
		req.user = user;
		if (req.user.role === "USER") {
			return res.status(401).json({ message: "Access denied" });
		}
		next();
	} catch (error) {
		console.log(error);
	}
};
