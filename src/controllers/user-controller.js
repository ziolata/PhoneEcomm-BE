import * as Services from "../services/user-service.js";

export const getProfileController = async (req, res) => {
	try {
		const response = await Services.getProfile();

		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const updateProfileController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.updateProfile(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const changePasswordController = async (req, res) => {
	try {
		req.body.email = req.user.email;
		console.log(req.body);

		const response = await Services.changePassword(req.body);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const forgotPasswordController = async (req, res) => {
	try {
		const response = await Services.forgotPassword(req.body.email);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const resetPasswordController = async (req, res) => {
	try {
		const { token } = req.params;
		req.body.token = token;
		const response = await Services.resetPassword(req.body);
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
