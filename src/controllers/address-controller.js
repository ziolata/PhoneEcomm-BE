import * as services from "../services/address-service.js";

export const createAddressController = async (req, res) => {
	try {
		const user_id = req.user.id;
		const response = await services.createAddress(user_id);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};

export const getAllAddressController = async (req, res) => {
	try {
		const user_id = req.user.id;
		const response = await services.getAllAddress(user_id);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};

export const updateAddressController = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.updateAddress(id, user);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};

export const deleteAddressController = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.deleteAddress(id, user);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
