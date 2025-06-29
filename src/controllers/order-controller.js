import * as services from "../services/order-service.js";

export const createOrderController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		const response = await services.createOrder(req.body, user_id);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
export const getAllOrderController = async (req, res, next) => {
	try {
		const user = req.user.id;
		const response = await services.getAllOrder(user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOneOrderController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.getOneOrder(id, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateOrderController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateOrder(req.body, id);
		return res.status(203).json(response);
	} catch (error) {
		next(error);
	}
};
export const deleteOrderController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteOrder(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
