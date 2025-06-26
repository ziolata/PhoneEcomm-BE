import * as services from "../services/shipping-service.js";

export const getShippingController = async (req, res, next) => {
	try {
		const order_id = req.body.order_id;
		const response = await services.getShippingByOrderId(order_id);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateShippingController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateShipping(id, req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteShippingController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.deleteShipping(id, user);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
