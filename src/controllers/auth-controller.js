import * as services from "../services/auth-service.js";

export const registerController = async (req, res, next) => {
	try {
		const response = await services.register(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
export const loginController = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const response = await services.login(email, password);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const changePasswordController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		req.body.email = req.user.email;
		const response = await services.changePassword(req.body, user_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const forgotPasswordController = async (req, res, next) => {
	try {
		const response = await services.forgotPassword(req.body.email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const resetPasswordController = async (req, res, next) => {
	try {
		const { token } = req.params;
		req.body.token = token;
		const response = await services.resetPassword(req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
