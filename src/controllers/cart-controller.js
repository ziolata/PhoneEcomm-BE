import { throwError } from "../utils/response-utils.js";
import * as Services from "../services/cart-service.js";

export const createCartController = async (req, res, next) => {
	try {
		req.body.user_id = req.user.id;
		const response = await Services.createCart(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllCartController = async (req, res, next) => {
	try {
		const user = req.user.id;
		const response = await Services.getAllCart(user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteCartController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await Services.deleteCartItem(id, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateCartController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await Services.updateCart(id, req.body, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
