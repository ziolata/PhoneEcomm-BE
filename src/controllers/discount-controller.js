import * as services from "../services/discountcode-service.js";
import Randomstring from "randomstring";

export const createDiscountController = async (req, res) => {
	try {
		const randomCode = Randomstring.generate();
		req.body.code = randomCode;
		const response = await services.createDiscount(req.body);
		return res.status(201).json(response);
	} catch (error) {
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
export const createMultiDiscountController = async (req, res) => {
	try {
		const numberCode = req.body.number;
		const discounts = [];
		for (let index = 0; index < numberCode; index++) {
			const randomCode = Randomstring.generate();
			req.body.code = randomCode;
			const response = await services.createDiscount(req.body);
			discounts.push(response);
		}
		return res.status(201).json(discounts);
	} catch (error) {
		console.log(error);
	}
};
