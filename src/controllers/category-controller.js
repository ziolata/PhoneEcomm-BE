import * as Services from "../services/category-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";
export const createCategoryController = async (req, res) => {
	try {
		const imgFile = req.files.img;
		const uploadResult = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"Category",
		);
		req.body.img = uploadResult.img_url;
		const response = await Services.addCategory(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const updateCategoryController = async (req, res) => {
	try {
		const { id } = req.params;
		const imgFile = req.files.img;
		const uploadResult = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"Category",
		);
		req.body.img = uploadResult.img_url;
		const response = await Services.updateCategory(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const deleteCategoryController = async (req, res) => {
	try {
		const { id } = req.params;

		const response = await Services.deleteCategory(id);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const getAllCategoryController = async (req, res) => {
	try {
		const response = await Services.getCategory();
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const getOneCategoryController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneCategory(id);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
