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
		const page = Number.parseInt(req.query.page) || 1;
		const email = req.query.email;
		const response = await services.getAllOrder(page, email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getOrderByUserController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const user_id = req.user.id;
		const response = await services.getOrderByUser(page, user_id);
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
		const user = req.user;
		const response = await services.updateOrder(req.body, id, user);
		return res.status(200).json(response);
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
