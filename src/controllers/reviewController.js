import * as services from "../services/review_service";

export const addReviewController = async (req, res) => {
	try {
		req.body.user_id = req.user.id;
		const response = await services.addReview(req.body);
		console.log(response);

		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
		const status = error.status;
		const message = error.message;
		return res.status(status).json({ message });
	}
};
