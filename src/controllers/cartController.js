import { throwError } from "../helper/response";
import * as Services from "../services/cart_service";

export const createCartController = async (req, res) => {
	try {
		req.body.user_id = req.user.id;
		const response = await Services.createCart(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);

		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const getAllCartController = async (req, res) => {
	try {
		const user = req.user.id;
		const response = await Services.getAllCart(user);
		return res.status(200).json(response);
	} catch (error) {
		throwError(res, error);
	}
};
export const deleteCartController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.deleteCartItem(id);
		return res.status(200).json(response);
	} catch (error) {
		throwError(res, error);
	}
};
export const updateCartController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await Services.updateCart(id);
		return res.status(200).json(response);
	} catch (error) {
		throwError(res, error);
	}
};
