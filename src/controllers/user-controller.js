import * as services from "../services/user-service.js";

export const getUserController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const target_id = id ? id : req.user.id;
		const response = await services.getUser(target_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllUserController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const email = req.query.email;
		const response = await services.getAllUser(page, email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateUserController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const role = req.user.role;
		const user_id = req.user.id;
		const targetUserId = role === "ADMIN" && id ? id : user_id;

		if (req.files?.avatar) {
			req.body.avatar = req.files.avatar;
		}
		const response = await services.updateUser(
			req.body,
			role,
			targetUserId,
			req.files?.avatar,
		);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteUserController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteUser(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
