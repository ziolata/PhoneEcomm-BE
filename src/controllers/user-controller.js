import * as Services from "../services/user-service.js";

export const getProfileController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		const response = await Services.getProfileUser(user_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateProfileController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.updateProfile(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const changePasswordController = async (req, res, next) => {
	try {
		req.body.email = req.user.email;
		const response = await Services.changePassword(req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const forgotPasswordController = async (req, res, next) => {
	try {
		const response = await Services.forgotPassword(req.body.email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const resetPasswordController = async (req, res, next) => {
	try {
		const { token } = req.params;
		req.body.token = token;
		const response = await Services.resetPassword(req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
