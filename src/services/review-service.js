import db from "../models/index.js";
import { successResponse, throwError } from "../utils/response-utils.js";

export const createReview = async (data, user_id) => {
	const existingProduct = await db.Order_item.findOne({
		where: {
			product_variant_id: data.product_variant_id,
		},
		include: {
			model: db.Order,
			attributes: ["user_id", "status"],
			where: {
				user_id,
				status: "completed",
			},
		},
	});
	const existingReview = await db.Review.findOne({
		where: {
			product_variant_id: data.product_variant_id,
			user_id,
		},
	});
	if (!existingProduct) {
		throwError(400, "Bạn chưa mua sản phẩm này không thể đánh giá!");
	}
	if (existingReview) {
		throwError(400, "Sản phẩm này bạn đã đánh giá!");
	}

	const response = await db.Review.create(data);
	return successResponse("Đánh giá thành công!", response);
};

export const getAllReview = async (product_variant_id) => {
	const response = await db.Review.findAll({ where: product_variant_id });
	return successResponse(
		`Lấy danh sách đánh giá của sản phẩm ${product_variant_id} thành công!`,
		response,
	);
};
