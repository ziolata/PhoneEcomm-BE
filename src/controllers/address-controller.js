import * as services from "../services/address-service.js";

export const createAddressController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		const response = await services.createAddress(user_id);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllAddressByUserIdController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		const response = await services.getAllAddressByUserId(user_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateAddressController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.updateAddress(id, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteAddressController = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.deleteAddress(id, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
