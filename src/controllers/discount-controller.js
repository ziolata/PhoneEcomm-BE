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
		return res.status(200).json(discounts);
	} catch (error) {
		next(error);
	}
};

export const getAllDiscountController = async (req, res, next) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const discount_type = req.query.type;
		const response = await services.getAllDiscount(page, discount_type);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteDiscountController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteDiscount(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
