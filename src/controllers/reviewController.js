import * as services from "../services/review_service";

export const createReviewController = async (req, res) => {
	try {
		req.body.user_id = req.user.id;
		const response = await services.createReview(req.body);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};

export const getAllReviewController = async (req, res) => {
	try {
		const response = await services.getAllReview();
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
