import * as services from "../services/discountcode-service.js";
import Randomstring from "randomstring";

export const createDiscountController = async (req, res, next) => {
	try {
		const randomCode = Randomstring.generate();
		req.body.code = randomCode;
		const response = await services.createDiscount(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const createMultiDiscountController = async (req, res, next) => {
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
		next(error);
	}
};
