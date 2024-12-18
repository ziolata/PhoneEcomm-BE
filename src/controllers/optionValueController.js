import * as services from "../services/option_value_service";

export const addOptionValueController = async (req, res) => {
	try {
		const response = await services.addOptionValue(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
