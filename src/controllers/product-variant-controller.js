import * as services from "../services/product-variant-service.js";

export const createProductVariantController = async (req, res, next) => {
	try {
		const response = await services.createProductVariant(
			req.body,
			req.files?.img,
		);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllProductVariantController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const prdName = req.query.name;
		const response = await services.getAllProductVariant(page, prdName);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneProductVariantController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.getOneProductVariant(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateProductVariantController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateProductVariant(
			id,
			req.body,
			req.files?.img,
		);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
export const deleteProductVariantController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteProductVariant(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
