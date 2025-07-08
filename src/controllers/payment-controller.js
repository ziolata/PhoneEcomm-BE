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
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllPaymentController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const email = req.query.email;
		const response = await services.getAllPayment(page, email);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
