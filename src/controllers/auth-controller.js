import { register, login } from "../services/auth-service.js";

export const registerController = async (req, res, next) => {
	try {
		const response = await register(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
export const loginController = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const response = await login(email, password);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
