import * as services from "../services/discount_code_service";
import Randomstring from "randomstring";

export const addDiscountController = async (req, res) => {
	try {
		const randomCode = Randomstring.generate();
		req.body.code = randomCode;
		const response = await services.addDiscount(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
export const postMultiDiscountController = async (req, res) => {
	try {
		const numberCode = req.body.number;
		const Discounts = [];
		for (let index = 0; index < numberCode; index++) {
			const randomCode = Randomstring.generate();
			req.body.code = randomCode;
			const response = await services.addDiscount(req.body);
			Discounts.push(response);
		}
		return res.status(201).json(Discounts);
	} catch (error) {
		console.log(error);
	}
};
