import * as Services from "../services/category-service.js";

export const createCategoryController = async (req, res, next) => {
	try {
		const response = await Services.addCategory(req.body, req.files?.img);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateCategoryController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.updateCategory(
			id,
			req.body,
			req.files?.img,
		);
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
