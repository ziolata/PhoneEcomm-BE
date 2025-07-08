import * as services from "../services/shipping-service.js";

export const getShippingByOrderIdController = async (req, res, next) => {
	try {
		const { order_id } = req.params;
		const page = Number.parseInt(req.query.page) || 1;
		const response = await services.getShippingByOrderId(page, order_id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllShippingController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const email = req.query.email;
		const response = await services.getAllShipping(page, email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateShippingController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateShipping(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteShippingController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.deleteShipping(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
