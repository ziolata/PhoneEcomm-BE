import * as Services from "../services/category-service.js";
import { uploadImage } from "../utils/cloudinary-utils.js";

export const createCategoryController = async (req, res, next) => {
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
		next(error);
	}
};

export const updateCategoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const imgFile = req.files.img;
		const uploadResult = await uploadImage(
			imgFile.tempFilePath,
			req.body.name,
			"Category",
		);
		req.body.img = uploadResult.img_url;
		const response = await Services.updateCategory(id, data);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteCategoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.deleteCategory(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllCategoryController = async (req, res, next) => {
	try {
		const response = await Services.getAllCategory();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneCategoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneCategory(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
