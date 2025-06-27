import * as services from "../services/user-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

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
		const response = await services.getAllUser();
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
		const targetUserId = role === "admin" && id ? id : user_id;
		if (req.files?.avatar) {
			const imgFile = req.files.avatar;
			const uploadResult = await uploadImage(
				imgFile.tempFilePath,
				`avatar_${id ? id : user_id}`,
				"avatar",
			);
			console.log(uploadResult);

			req.body.avatar = uploadResult;
		}
		console.log(req.body.avatar);

		const response = await services.updateUser(req.body, role, targetUserId);
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
