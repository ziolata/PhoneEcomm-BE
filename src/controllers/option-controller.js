import * as services from "../services/option-service.js";

export const createOptionController = async (req, res) => {
	try {
		const response = await services.createOption(req.body);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const getAllOptionController = async (req, res) => {
	try {
		const response = await services.getAllOption();
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
