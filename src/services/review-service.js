import db from "../models/index.js";

export const createReview = async (data) => {
	try {
		const existingProduct = await db.Order_item.findOne({
			where: {
				product_variant_id: data.product_variant_id,
			},
			include: {
				model: db.Order,
				attributes: ["user_id", "status"],
				where: {
					user_id: data.user_id,
					status: "completed",
				},
			},
		});
		const existingReview = await db.Review.findOne({
			where: {
				product_variant_id: data.product_variant_id,
				user_id: data.user_id,
			},
		});
		if (!existingProduct) {
			throw {
				status: 400,
				message: "Bạn chưa mua sản phẩm này không thể đánh giá",
			};
		}
		if (existingReview) {
			throw {
				status: 400,
				message: "Sản phẩm này bạn đã đánh giá !",
			};
		}

		const response = await db.Review.create(data);
		return { data: response };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllReview = async () => {
	try {
		const response = await db.Review.findAll();
		return { data: response };
	} catch (error) {
		console.log(error);
	}
};
