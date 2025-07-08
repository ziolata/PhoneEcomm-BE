import * as services from "../services/address-service.js";

export const createAddressController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		req.body.user_id = user_id;
		const response = await services.createAddress(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAddressByUserIdController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		const response = await services.getAddressByUserId(user_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllAddressController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const email = req.query.email;
		const response = await services.getAllAddress(page, email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateAddressController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.updateAddress(id, user, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteAddressController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.deleteAddress(id, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
