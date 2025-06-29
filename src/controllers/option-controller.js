import * as services from "../services/option-service.js";

export const createOptionController = async (req, res, next) => {
	try {
		const response = await services.createOption(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
export const getAllOptionController = async (req, res, next) => {
	try {
		const response = await services.getAllOption();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneOptionController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.getOneOption(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateOptionController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateOption(req.body, id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteOptionController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteOption(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
