import * as services from "../services/option-value-service.js";

export const createOptionValueController = async (req, res, next) => {
	try {
		const response = await services.createOptionValue(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllOptionValueController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const value = req.query.value;
		const response = await services.getAllOptionValue(page, value);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneOptionValueController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.getOneOptionValue(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateOptionValueController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateOptionValue(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteOptionValueController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteOptionValue(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
