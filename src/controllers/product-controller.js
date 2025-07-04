import * as Services from "../services/product-service.js";

export const createProductController = async (req, res, next) => {
	try {
		const response = await Services.createProduct(req.body, req.files?.img);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateProductController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.updateProduct(id, req.body, req.files?.img);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteProductController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.deleteProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllProductController = async (req, res, next) => {
	try {
		const response = await Services.getAllProduct();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneProductController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await Services.getOneProduct(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
