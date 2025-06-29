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

export const getOneReviewController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.getOneReview(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const updateReviewController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.updateReview(id, req.body);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteReviewController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await services.deleteReview(id);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
