import * as Services from "../services/cart_service";

export const postCartController = async (req, res) => {
	try {
		req.body.user_id = req.user.id;
		const response = await Services.addCart(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
		const statusError = error.status || 500;
		const messageError = error.message || "Server Internal Error";
		return res.status(statusError).json(messageError);
	}
};
export const getCartController = async (req, res) => {
	try {
		const user = req.user.id;
		const response = await Services.getCart(user);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
