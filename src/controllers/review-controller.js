import * as services from "../services/review-service.js";

export const createReviewController = async (req, res, next) => {
	try {
		const user_id = req.user.id;
		req.body.user_id = user_id;
		const response = await services.createReview(
			req.body,
			user_id,
			req.files?.img,
		);
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
		const user = req.user;
		const response = await services.updateReview(
			id,
			req.body,
			user,
			req.files?.img,
		);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const deleteReviewController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const response = await services.deleteReview(id, user);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
