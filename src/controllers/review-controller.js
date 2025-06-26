import * as services from "../services/review-service.js";

export const createReviewController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		const response = await services.createReview(req.body, user_id);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
};

export const getAllReviewController = async (req, res, next) => {
	try {
		const productVariantId = req.body.product_variant_id;
		const response = await services.getAllReview(productVariantId);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
