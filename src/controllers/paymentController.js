import * as services from "../services/payment_service";

export const createPaymentController = async (req, res) => {
	try {
		req.body.ip = req.ip;
		const response = await services.createPayment(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const getPaymentController = async (req, res) => {
	try {
		const response = await services.getPayment(req.query);
		if (response) {
			return res.redirect("http://e-commerceee.vn:3000");
		}
	} catch (error) {
		console.log(error);
	}
};
