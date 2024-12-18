import * as services from "../services/order_service";

export const addOrderController = async (req, res) => {
	try {
		req.body.user_id = req.user.id;
		const response = await services.addOrder(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const getOrderController = async (req, res) => {
	try {
		console.log(req.ip);

		const user = req.user.id;
		const response = await services.getOrder(user);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			error: -1,
			message: "Server Internal Error",
		});
	}
};
export const updateOrderController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await services.updateOrder(req.body, id);
		return res.status(203).json(response);
	} catch (error) {
		console.log(error);
		const statusError = error.status || 500;
		const message = error.message || "Server Internal Error";
		return res.status(statusError).json({ message });
	}
};
export const deleteOrderController = async (req, res) => {
	try {
		const response = await services.deleteOrder(req.params);
		return res.status(200);
	} catch (error) {}
};
