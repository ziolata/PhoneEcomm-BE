import * as services from "../services/address_service";

export const createAddressController = async (req, res) => {
	try {
		req.body.user_id = req.user.id;
		const response = await services.createAddress(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
