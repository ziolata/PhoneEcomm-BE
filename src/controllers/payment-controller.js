import * as services from "../services/payment-service.js";

export const createPaymentController = async (req, res, next) => {
	try {
		req.body.ip = req.ip;
		const response = await services.createPayment(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};
export const getPaymentController = async (req, res, next) => {
	try {
		const response = await services.getPayment(req.query);
		if (response) {
			return res.redirect("http://e-commerceee.vn:3000");
		}
	} catch (error) {
		next(error);
	}
};
