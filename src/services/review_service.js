import db from "../models";
export const addReview = async (data) => {
	try {
		const OrderData = await db.Order.findAll({
			where: {
				user_id: data.user_id,
				status: "completed",
			},
			include: {
				model: db.Order_item,
				attributes: ["product_variant_id"],
			},
		});
		for (const order of OrderData) {
			for (const item of order.Order_items) {
				console.log(item);

				if (data.product_variant_id === item.product_variant_id) {
					const review = await db.Review.create(data);
					return review;
				}
			}
		}

		throw {
			status: 400,
			message: "Bạn chưa mua sản phẩm này không thể đánh giá",
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
