import * as services from "../services/option-value-service.js";

export const createOptionValueController = async (req, res) => {
	try {
		const response = await services.createOptionValue(req.body);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const getAllOptionValueController = async (req, res) => {
	try {
		const response = await services.getAllOptionValue();
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
