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
		const response = await services.getAllOptionValue();
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
