import * as services from "../services/option_service";

export const addOptionController = async (req, res) => {
	try {
		const response = await services.addOption(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
